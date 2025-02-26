import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const getStripeCustomer = async (email: string, name?: string) => {
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
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}; 