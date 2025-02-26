import Stripe from 'stripe';

// Verificar si la clave API de Stripe está disponible
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripeInstance: Stripe | null = null;

// Solo inicializar Stripe si la clave API está disponible
if (stripeSecretKey) {
  stripeInstance = new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16',
    typescript: true,
  });
}

// Exportar una instancia de Stripe o una implementación simulada
export const stripe = stripeInstance || {
  customers: {
    list: async () => ({ data: [] }),
    create: async () => ({ id: 'mock_customer_id' }),
  },
  checkout: {
    sessions: {
      create: async () => ({ url: '#' }),
    },
  },
  billingPortal: {
    sessions: {
      create: async () => ({ url: '#' }),
    },
  },
  webhooks: {
    constructEvent: () => ({ type: 'mock_event', data: { object: {} } }),
  },
} as unknown as Stripe;

export const getStripeCustomer = async (email: string, name?: string) => {
  // Si Stripe no está configurado, devolver un cliente simulado
  if (!stripeInstance) {
    console.log('Stripe no está configurado. Devolviendo cliente simulado.');
    return { id: 'mock_customer_id' };
  }

  const customers = await stripe.customers.list({ email });

  // Si el cliente ya existe, devolver el primero
  if (customers.data.length > 0) {
    return customers.data[0];
  }

  // Si no existe, crear un nuevo cliente
  return stripe.customers.create({
    email,
    name: name || email,
  });
};

export const createCheckoutSession = async ({
  priceId,
  customerId,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  customerId: string;
  successUrl: string;
  cancelUrl: string;
}) => {
  // Si Stripe no está configurado, devolver una URL simulada
  if (!stripeInstance) {
    console.log('Stripe no está configurado. Devolviendo URL simulada.');
    return { url: successUrl };
  }

  return stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    allow_promotion_codes: true,
  });
};

export const createBillingPortalSession = async ({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}) => {
  // Si Stripe no está configurado, devolver una URL simulada
  if (!stripeInstance) {
    console.log('Stripe no está configurado. Devolviendo URL simulada.');
    return { url: returnUrl };
  }

  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}; 