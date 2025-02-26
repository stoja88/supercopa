import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

async function main() {
  console.log('🚀 Iniciando la creación de planes en Stripe y en la base de datos...');

  // Definición de los planes
  const plans = [
    {
      name: 'Básico',
      description: 'Plan básico para familias pequeñas',
      price: 9.99,
      features: [
        'Calendario compartido',
        'Mensajería básica',
        'Hasta 5 documentos',
        'Registro de gastos básico',
      ],
      includesLegalAssistant: false,
    },
    {
      name: 'Estándar',
      description: 'Plan ideal para la mayoría de las familias',
      price: 19.99,
      features: [
        'Calendario avanzado',
        'Mensajería ilimitada',
        'Hasta 20 documentos',
        'Registro y análisis de gastos',
        'Recordatorios automáticos',
      ],
      includesLegalAssistant: false,
    },
    {
      name: 'Premium',
      description: 'Todas las funcionalidades sin límites',
      price: 29.99,
      features: [
        'Calendario avanzado con sincronización',
        'Mensajería ilimitada con archivos',
        'Documentos ilimitados',
        'Análisis avanzado de gastos',
        'Recordatorios personalizados',
        'Asistente legal básico',
      ],
      includesLegalAssistant: true,
    },
  ];

  for (const plan of plans) {
    console.log(`Creando plan: ${plan.name}`);

    // 1. Crear producto en Stripe
    const product = await stripe.products.create({
      name: plan.name,
      description: plan.description,
    });

    console.log(`Producto creado en Stripe: ${product.id}`);

    // 2. Crear precio en Stripe (mensual)
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(plan.price * 100), // Convertir a centavos
      currency: 'eur',
      recurring: {
        interval: 'month',
      },
    });

    console.log(`Precio creado en Stripe: ${price.id}`);

    // 3. Guardar en la base de datos
    const dbPlan = await prisma.plan.create({
      data: {
        name: plan.name,
        description: plan.description,
        price: plan.price,
        stripePriceId: price.id,
        stripeProductId: product.id,
        features: plan.features,
        includesLegalAssistant: plan.includesLegalAssistant,
      },
    });

    console.log(`Plan guardado en la base de datos: ${dbPlan.id}`);
  }

  console.log('✅ Todos los planes han sido creados correctamente');
}

main()
  .catch((e) => {
    console.error('Error al crear los planes:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 