import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { 
  getPlans, 
  getUserSubscription, 
  hasActiveSubscription 
} from '@/lib/subscription';
import { getStripeCustomer, createCheckoutSession, createBillingPortalSession } from '@/lib/stripe';

// Verificar si Stripe está configurado
const isStripeConfigured = !!process.env.STRIPE_SECRET_KEY;

// GET: Obtener información de suscripción del usuario actual
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    // Obtener la suscripción del usuario
    const subscription = await getUserSubscription(userId);
    
    // Obtener todos los planes disponibles
    const plans = await getPlans();
    
    // Verificar si el usuario tiene una suscripción activa
    const isActive = await hasActiveSubscription(userId);
    
    return NextResponse.json({
      subscription,
      plans,
      isActive,
      stripeEnabled: isStripeConfigured,
    });
  } catch (error) {
    console.error('Error al obtener información de suscripción:', error);
    return NextResponse.json(
      { error: 'Error al obtener información de suscripción' },
      { status: 500 }
    );
  }
}

// POST: Crear una sesión de checkout para una nueva suscripción
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    
    // Si Stripe no está configurado, devolver un error
    if (!isStripeConfigured) {
      return NextResponse.json(
        { error: 'El sistema de pagos no está configurado actualmente', stripeEnabled: false },
        { status: 503 }
      );
    }
    
    const { planId, priceId } = await request.json();
    
    if (!planId || !priceId) {
      return NextResponse.json(
        { error: 'Se requiere un ID de plan y un ID de precio' },
        { status: 400 }
      );
    }
    
    const userId = session.user.id;
    const email = session.user.email;
    const name = session.user.name || undefined;
    
    // Obtener o crear el cliente de Stripe
    const customer = await getStripeCustomer(email, name);
    
    // Crear una sesión de checkout
    const checkoutSession = await createCheckoutSession({
      priceId,
      customerId: customer.id,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/suscripcion/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/suscripcion`,
    });
    
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Error al crear sesión de checkout:', error);
    return NextResponse.json(
      { error: 'Error al crear sesión de checkout' },
      { status: 500 }
    );
  }
}

// PUT: Crear una sesión del portal de facturación para gestionar la suscripción
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    
    // Si Stripe no está configurado, devolver un error
    if (!isStripeConfigured) {
      return NextResponse.json(
        { error: 'El sistema de pagos no está configurado actualmente', stripeEnabled: false },
        { status: 503 }
      );
    }
    
    const userId = session.user.id;
    
    // Obtener la suscripción del usuario
    const subscription = await getUserSubscription(userId);
    
    if (!subscription) {
      return NextResponse.json(
        { error: 'No se encontró una suscripción para este usuario' },
        { status: 404 }
      );
    }
    
    // Crear una sesión del portal de facturación
    const portalSession = await createBillingPortalSession({
      customerId: subscription.stripeCustomerId || '',
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/suscripcion`,
    });
    
    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('Error al crear sesión del portal de facturación:', error);
    return NextResponse.json(
      { error: 'Error al crear sesión del portal de facturación' },
      { status: 500 }
    );
  }
} 