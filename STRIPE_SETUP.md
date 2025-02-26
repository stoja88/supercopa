# Configuración de Stripe para CoParentalidad

Este documento proporciona instrucciones para configurar Stripe y ejecutar el script de inicialización de planes de suscripción.

## Requisitos previos

1. Cuenta en Stripe (puedes crear una en [stripe.com](https://stripe.com))
2. Node.js y npm instalados
3. Proyecto CoParentalidad clonado y dependencias instaladas

## Configuración de Stripe

### 1. Obtener claves API de Stripe

1. Inicia sesión en tu cuenta de Stripe
2. Ve al [Dashboard de Stripe](https://dashboard.stripe.com/dashboard)
3. En el modo de prueba (Test mode), ve a Desarrolladores > Claves API
4. Copia la "Clave secreta" (Secret key)

### 2. Configurar variables de entorno

Añade las siguientes variables a tu archivo `.env`:

```
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta
STRIPE_WEBHOOK_SECRET=whsec_tu_clave_webhook
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publicable
```

### 3. Configurar Webhook (para eventos de Stripe)

1. En el Dashboard de Stripe, ve a Desarrolladores > Webhooks
2. Haz clic en "Añadir endpoint"
3. Configura la URL del endpoint: `https://tu-dominio.com/api/webhook` (o usa una URL de Ngrok para desarrollo local)
4. Selecciona los eventos a escuchar:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `checkout.session.completed`
5. Haz clic en "Añadir endpoint"
6. Copia la "Clave de firma" (Signing secret) y añádela a tu archivo `.env` como `STRIPE_WEBHOOK_SECRET`

## Inicialización de planes de suscripción

Para crear los planes de suscripción en Stripe y en la base de datos, ejecuta el siguiente comando:

```bash
npm run init-plans
```

Este script creará tres planes de suscripción:
- **Básico**: 9,99€/mes
- **Estándar**: 19,99€/mes
- **Premium**: 29,99€/mes

## Pruebas de suscripción

Para probar las suscripciones en modo de desarrollo:

1. Usa las [tarjetas de prueba de Stripe](https://stripe.com/docs/testing#cards)
2. Número de tarjeta de prueba: `4242 4242 4242 4242`
3. Fecha de caducidad: cualquier fecha futura
4. CVC: cualquier número de 3 dígitos
5. Código postal: cualquier código postal válido

## Solución de problemas

### Webhook no recibe eventos

1. Verifica que la URL del webhook sea accesible públicamente
2. Comprueba que la clave de firma del webhook sea correcta
3. Usa la herramienta de línea de comandos de Stripe CLI para probar los webhooks localmente

### Error al crear planes

1. Verifica que las claves API de Stripe sean correctas
2. Comprueba que la base de datos esté accesible
3. Revisa los logs para identificar errores específicos

## Recursos adicionales

- [Documentación de Stripe](https://stripe.com/docs)
- [Guía de Stripe Checkout](https://stripe.com/docs/checkout/quickstart)
- [Guía de Stripe Billing](https://stripe.com/docs/billing/quickstart)
- [Pruebas con Stripe](https://stripe.com/docs/testing) 