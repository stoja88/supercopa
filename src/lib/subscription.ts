import prisma from '@/lib/prisma';
import { stripe, getStripeCustomer } from '@/lib/stripe';

// Obtener todos los planes disponibles
export const getPlans = async () => {
  return prisma.plan.findMany({
    orderBy: {
      price: 'asc',
    },
  });
};

// Obtener un plan específico por ID
export const getPlanById = async (id: string) => {
  return prisma.plan.findUnique({
    where: { id },
  });
};

// Obtener la suscripción de un usuario
export const getUserSubscription = async (userId: string) => {
  return prisma.subscription.findUnique({
    where: { userId },
    include: {
      plan: true,
    },
  });
};

// Verificar si un usuario tiene una suscripción activa
export const hasActiveSubscription = async (userId: string) => {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  if (!subscription) return false;

  return (
    subscription.status === 'ACTIVE' &&
    subscription.stripeCurrentPeriodEnd.getTime() > Date.now()
  );
};

// Crear o actualizar la suscripción de un usuario
export const upsertSubscription = async ({
  userId,
  stripeSubscriptionId,
  stripePriceId,
  stripeCustomerId,
  planId,
  status = 'ACTIVE',
  stripeCurrentPeriodEnd,
}: {
  userId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripeCustomerId: string;
  planId: string;
  status?: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'TRIALING' | 'UNPAID';
  stripeCurrentPeriodEnd: Date;
}) => {
  // Actualizar el ID de cliente de Stripe en el usuario si es necesario
  await prisma.user.update({
    where: { id: userId },
    data: {
      stripeCustomerId,
    },
  });

  // Crear o actualizar la suscripción
  return prisma.subscription.upsert({
    where: { userId },
    create: {
      userId,
      stripeSubscriptionId,
      stripePriceId,
      stripeCustomerId,
      planId,
      status,
      stripeCurrentPeriodEnd,
    },
    update: {
      stripeSubscriptionId,
      stripePriceId,
      stripeCustomerId,
      planId,
      status,
      stripeCurrentPeriodEnd,
    },
  });
};

// Cancelar la suscripción de un usuario
export const cancelSubscription = async (userId: string) => {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  if (!subscription) {
    throw new Error('No se encontró una suscripción para este usuario');
  }

  // Cancelar la suscripción en Stripe
  await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);

  // Actualizar el estado de la suscripción en la base de datos
  return prisma.subscription.update({
    where: { userId },
    data: {
      status: 'CANCELED',
    },
  });
};

// Inicializar los planes en la base de datos (para desarrollo)
export const initializePlans = async () => {
  const plans = [
    {
      name: 'Básico',
      description: 'Plan básico para familias pequeñas',
      price: 9.99,
      stripePriceId: 'price_basic',
      features: [
        'Gestión de 1 familia',
        'Calendario compartido',
        'Mensajería básica',
        'Hasta 10 documentos',
      ],
      maxFamilies: 1,
      maxDocuments: 10,
      maxEvents: 20,
      includesLegalAssistant: false,
    },
    {
      name: 'Estándar',
      description: 'Plan ideal para la mayoría de las familias',
      price: 19.99,
      stripePriceId: 'price_standard',
      features: [
        'Gestión de 2 familias',
        'Calendario avanzado',
        'Mensajería ilimitada',
        'Hasta 50 documentos',
        'Gestión de gastos',
      ],
      maxFamilies: 2,
      maxDocuments: 50,
      maxEvents: 100,
      includesLegalAssistant: false,
    },
    {
      name: 'Premium',
      description: 'Plan completo con todas las funcionalidades',
      price: 29.99,
      stripePriceId: 'price_premium',
      features: [
        'Gestión de familias ilimitadas',
        'Calendario avanzado',
        'Mensajería ilimitada',
        'Documentos ilimitados',
        'Gestión avanzada de gastos',
        'Asistente legal IA',
      ],
      maxFamilies: 999,
      maxDocuments: 999,
      maxEvents: 999,
      includesLegalAssistant: true,
    },
  ];

  // Crear los planes en la base de datos
  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { stripePriceId: plan.stripePriceId },
      create: plan,
      update: plan,
    });
  }

  return prisma.plan.findMany();
}; 