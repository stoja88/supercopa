import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { upsertSubscription } from '@/lib/subscription';
import prisma from '@/lib/prisma';

// Función para manejar el evento de suscripción creada o actualizada
const handleSubscriptionCreatedOrUpdated = async (subscription: any) => {
  const customerId = subscription.customer as string;
  const subscriptionId = subscription.id as string;
  const priceId = subscription.items.data[0].price.id as string;
  const status = subscription.status;
  const currentPeriodEnd = new Date(subscription.current_period_end * 1000);

  // Buscar el usuario por el ID de cliente de Stripe
  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId: customerId,
    },
  });

  if (!user) {
    console.error(`No se encontró un usuario con el ID de cliente de Stripe: ${customerId}`);
    return;
  }

  // Buscar el plan por el ID de precio de Stripe
  const plan = await prisma.plan.findFirst({
    where: {
      stripePriceId: priceId,
    },
  });

  if (!plan) {
    console.error(`No se encontró un plan con el ID de precio de Stripe: ${priceId}`);
    return;
  }

  // Actualizar o crear la suscripción
  await upsertSubscription({
    userId: user.id,
    stripeSubscriptionId: subscriptionId,
    stripePriceId: priceId,
    stripeCustomerId: customerId,
    planId: plan.id,
    status: status as any,
    stripeCurrentPeriodEnd: currentPeriodEnd,
  });
};

// Función para manejar el evento de suscripción cancelada
const handleSubscriptionCanceled = async (subscription: any) => {
  const subscriptionId = subscription.id as string;

  // Buscar la suscripción por el ID de suscripción de Stripe
  const dbSubscription = await prisma.subscription.findFirst({
    where: {
      stripeSubscriptionId: subscriptionId,
    },
  });

  if (!dbSubscription) {
    console.error(`No se encontró una suscripción con el ID de Stripe: ${subscriptionId}`);
    return;
  }

  // Actualizar el estado de la suscripción
  await prisma.subscription.update({
    where: {
      id: dbSubscription.id,
    },
    data: {
      status: 'CANCELED',
    },
  });
};

// POST: Manejar eventos de webhook de Stripe
export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    console.error(`Error al verificar la firma del webhook: ${error.message}`);
    return NextResponse.json(
      { error: `Error al verificar la firma del webhook: ${error.message}` },
      { status: 400 }
    );
  }

  // Manejar diferentes tipos de eventos
  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionCreatedOrUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object);
        break;
      default:
        console.log(`Evento no manejado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Error al manejar el evento ${event.type}:`, error);
    return NextResponse.json(
      { error: `Error al manejar el evento ${event.type}` },
      { status: 500 }
    );
  }
} 