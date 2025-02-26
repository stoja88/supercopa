# Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar la aplicación CoParentalidad en Vercel con una base de datos PostgreSQL.

## Requisitos previos

1. Una cuenta en [Vercel](https://vercel.com)
2. Una cuenta en [GitHub](https://github.com)
3. Una base de datos PostgreSQL (puedes usar [Supabase](https://supabase.com), [Neon](https://neon.tech) o [Railway](https://railway.app))

## Pasos para el despliegue

### 1. Preparar el repositorio en GitHub

1. Crea un nuevo repositorio en GitHub
2. Sube el código de la aplicación al repositorio:

```bash
git init
git add .
git commit -m "Versión inicial"
git branch -M main
git remote add origin https://github.com/tu-usuario/coparentalidad.git
git push -u origin main
```

### 2. Configurar la base de datos

#### Opción A: Usar Supabase

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a "Settings" > "Database" y copia la cadena de conexión PostgreSQL
4. Reemplaza `[YOUR-PASSWORD]` con la contraseña que estableciste al crear el proyecto

#### Opción B: Usar Neon

1. Crea una cuenta en [Neon](https://neon.tech)
2. Crea un nuevo proyecto
3. Copia la cadena de conexión proporcionada

#### Opción C: Usar Railway

1. Crea una cuenta en [Railway](https://railway.app)
2. Crea un nuevo proyecto con una base de datos PostgreSQL
3. Ve a la pestaña "Variables" y copia la variable `DATABASE_URL`

### 3. Desplegar en Vercel

1. Inicia sesión en [Vercel](https://vercel.com)
2. Haz clic en "Add New" > "Project"
3. Importa tu repositorio de GitHub
4. Configura las siguientes variables de entorno:

   - `DATABASE_URL`: La cadena de conexión de tu base de datos PostgreSQL
   - `NEXTAUTH_URL`: La URL completa de tu aplicación (ej. `https://coparentalidad.vercel.app`)
   - `NEXTAUTH_SECRET`: Un secreto aleatorio (puedes generarlo con `openssl rand -base64 32`)
   - `NEXT_PUBLIC_APP_URL`: La misma URL que `NEXTAUTH_URL`

   Nota: La configuración de Stripe se realizará más adelante.

5. Haz clic en "Deploy"

### 4. Ejecutar migraciones de la base de datos

Una vez desplegada la aplicación, necesitas ejecutar las migraciones de la base de datos:

1. En tu terminal local, configura la variable de entorno `DATABASE_URL` con la cadena de conexión de tu base de datos:

```bash
export DATABASE_URL="tu-cadena-de-conexion"
```

2. Ejecuta las migraciones:

```bash
npx prisma migrate deploy
```

### 5. Verificar el despliegue

1. Visita la URL de tu aplicación desplegada
2. Verifica que puedes registrarte e iniciar sesión
3. Comprueba que todas las funcionalidades están operativas

## Funcionalidades pendientes

La integración con Stripe para el procesamiento de pagos y suscripciones se configurará más adelante. Por ahora, la aplicación funcionará sin las características de suscripción premium.

## Solución de problemas

### Error de conexión a la base de datos

Si encuentras errores de conexión a la base de datos:

1. Verifica que la cadena de conexión sea correcta
2. Asegúrate de que la base de datos esté accesible desde Vercel (algunas bases de datos requieren configurar listas blancas de IP)
3. Comprueba que las migraciones se hayan ejecutado correctamente

### Errores de autenticación

Si hay problemas con la autenticación:

1. Verifica que `NEXTAUTH_URL` y `NEXT_PUBLIC_APP_URL` estén configurados correctamente
2. Asegúrate de que `NEXTAUTH_SECRET` sea un valor seguro y aleatorio
3. Comprueba que las tablas de autenticación se hayan creado correctamente en la base de datos

## Actualizaciones

Para actualizar la aplicación desplegada:

1. Realiza tus cambios en el código
2. Haz commit y push a GitHub:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

3. Vercel detectará automáticamente los cambios y desplegará la nueva versión

Si necesitas ejecutar nuevas migraciones:

```bash
npx prisma migrate deploy
``` 