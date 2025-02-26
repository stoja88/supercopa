# Implementación Futura de Stripe

Este documento contiene instrucciones para implementar Stripe en la aplicación CoParentalidad en una fase posterior.

## Pasos para Implementar Stripe

### 1. Crear una Cuenta en Stripe

1. Regístrate en [Stripe](https://stripe.com)
2. Completa la verificación de tu cuenta
3. Configura tu información bancaria para recibir pagos

### 2. Obtener Claves de API

1. En el panel de control de Stripe, ve a "Desarrolladores" > "Claves de API"
2. Copia las claves de API:
   - `STRIPE_SECRET_KEY`: Clave secreta para el servidor
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Clave pública para el cliente

### 3. Configurar Variables de Entorno

Añade las siguientes variables a tu archivo `.env`:

```
# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

Para producción, asegúrate de usar las claves de producción, no las de prueba.

### 4. Configurar Webhooks

1. En el panel de control de Stripe, ve a "Desarrolladores" > "Webhooks"
2. Haz clic en "Añadir endpoint"
3. Configura la URL del endpoint: `https://tu-dominio.com/api/webhook`
4. Selecciona los eventos a escuchar:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copia el "Secreto de firma del webhook" y añádelo a tus variables de entorno como `STRIPE_WEBHOOK_SECRET`

### 5. Activar las Rutas de API

Las rutas de API para Stripe ya están implementadas en la aplicación, pero están desactivadas. Para activarlas:

1. Revisa y actualiza los archivos:
   - `src/app/api/subscription/route.ts`
   - `src/app/api/webhook/route.ts`
   - `src/lib/stripe.ts`
   - `src/lib/subscription.ts`

2. Asegúrate de que las importaciones y funciones estén correctamente configuradas

### 6. Activar las Páginas de Suscripción

Las páginas de suscripción ya están implementadas, pero pueden requerir ajustes:

1. Revisa y actualiza:
   - `src/app/(dashboard)/dashboard/subscription/page.tsx`
   - `src/app/(dashboard)/dashboard/subscription/success/page.tsx`
   - `src/app/(dashboard)/dashboard/subscription/cancel/page.tsx`

### 7. Probar la Integración

1. Usa el modo de prueba de Stripe para verificar que todo funciona correctamente
2. Prueba el flujo completo de suscripción:
   - Selección de plan
   - Checkout
   - Gestión de suscripción
   - Cancelación

### 8. Migrar a Producción

Una vez que todo funcione correctamente en modo de prueba:

1. Cambia a las claves de producción de Stripe
2. Configura los webhooks para producción
3. Realiza pruebas finales con tarjetas reales

## Recursos Útiles

- [Documentación de Stripe](https://stripe.com/docs)
- [Guía de Stripe para Next.js](https://stripe.com/docs/checkout/quickstart?client=next)
- [Webhooks de Stripe](https://stripe.com/docs/webhooks)
- [Stripe Testing](https://stripe.com/docs/testing)

## Notas Importantes

- Asegúrate de manejar correctamente los errores en las transacciones
- Implementa notificaciones para informar a los usuarios sobre el estado de sus suscripciones
- Considera implementar un sistema de facturas para los pagos realizados
- Revisa regularmente la documentación de Stripe para mantener actualizada la integración 