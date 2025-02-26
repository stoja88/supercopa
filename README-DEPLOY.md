# Guía de Despliegue en Vercel

Esta guía proporciona instrucciones detalladas para desplegar la aplicación CoParent en Vercel con una base de datos PostgreSQL.

## Requisitos previos

1. **Cuenta en Vercel**: Regístrate en [Vercel](https://vercel.com) si aún no tienes una cuenta.
2. **Repositorio Git**: Sube el código a GitHub, GitLab o Bitbucket.
3. **Proyecto en Supabase** (opcional): Para el almacenamiento de archivos.

## Métodos de despliegue

Hay dos formas de desplegar la aplicación en Vercel:

### 1. Usando Vercel CLI (Recomendado)

Este método es más rápido y te permite gestionar todo desde la línea de comandos.

#### Pasos para el despliegue con CLI

1. **Instala Vercel CLI globalmente**:
   ```bash
   npm install -g vercel
   ```

2. **Inicia sesión en Vercel**:
   ```bash
   vercel login
   ```

3. **Inicializa el proyecto en Vercel**:
   ```bash
   npm run init-vercel
   ```
   Este script te guiará a través del proceso de configuración, incluyendo:
   - Vincular el proyecto a Vercel
   - Crear una base de datos PostgreSQL
   - Configurar las variables de entorno
   - Preparar las migraciones de Prisma

4. **Despliega el proyecto**:
   ```bash
   npm run deploy
   ```
   Para desplegar a producción:
   ```bash
   npm run deploy-prod
   ```

### 2. Usando el Dashboard de Vercel

Este método es más visual y te permite configurar todo desde la interfaz web de Vercel.

#### Pasos para el despliegue con Dashboard

1. **Preparar el repositorio**:
   Asegúrate de que el código esté en un repositorio Git y que incluya todos los archivos necesarios:
   ```bash
   git add .
   git commit -m "Preparar para despliegue en Vercel"
   git push
   ```

2. **Configurar Vercel Postgres**:
   1. En el dashboard de Vercel, ve a "Storage" > "Create Database".
   2. Selecciona "Postgres".
   3. Sigue las instrucciones para crear la base de datos.
   4. Una vez creada, Vercel configurará automáticamente las variables `POSTGRES_PRISMA_URL` y `POSTGRES_URL_NON_POOLING`.

3. **Configurar el proyecto en Vercel**:
   1. Inicia sesión en [Vercel](https://vercel.com).
   2. Haz clic en "Add New" > "Project".
   3. Importa tu repositorio Git.
   4. Configura el proyecto:
      - **Framework Preset**: Next.js
      - **Root Directory**: ./
      - **Build Command**: npm run vercel-build
      - **Output Directory**: .next

4. **Configurar variables de entorno**:
   En la sección "Environment Variables" de Vercel, añade las siguientes variables:
   ```
   NEXTAUTH_URL=https://tu-dominio.vercel.app
   NEXTAUTH_SECRET=un_secreto_seguro_y_aleatorio
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
   NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
   ```

5. **Desplegar**:
   1. Haz clic en "Deploy" en el dashboard de Vercel.
   2. Espera a que se complete el proceso de despliegue.
   3. Una vez completado, haz clic en "Visit" para ver tu aplicación en vivo.

## Verificación del despliegue

Después del despliegue, verifica que:

1. La aplicación se carga correctamente.
2. El registro e inicio de sesión funcionan.
3. Las funcionalidades que dependen de la base de datos funcionan (crear familias, mensajes, etc.).
4. La carga y descarga de archivos funciona si estás usando Supabase.

## Solución de problemas comunes

### Error de conexión a la base de datos

- Verifica que la base de datos Vercel Postgres esté correctamente configurada.
- Comprueba que las variables de entorno `POSTGRES_PRISMA_URL` y `POSTGRES_URL_NON_POOLING` estén configuradas.
- Revisa los logs de Vercel para ver errores específicos.

### Error de autenticación

- Asegúrate de que `NEXTAUTH_URL` coincida exactamente con la URL de tu aplicación.
- Verifica que `NEXTAUTH_SECRET` esté configurado correctamente.

### Error en las migraciones de Prisma

- Revisa los logs de build para identificar el problema específico.
- Si persisten los problemas, puedes ejecutar manualmente la migración:
  ```bash
  npx prisma migrate reset --force
  npx prisma migrate deploy
  ```

## Actualización de la aplicación

Para actualizar la aplicación desplegada:

1. Realiza los cambios en tu código local.
2. Haz commit y push a tu repositorio.
3. Si usas Vercel CLI, ejecuta `npm run deploy` o `npm run deploy-prod`.
4. Si usas el dashboard, Vercel detectará automáticamente los cambios y desplegará la nueva versión.

## Monitoreo y logs

- Puedes ver los logs de tu aplicación en la sección "Deployments" > [deployment] > "Logs".
- Para monitoreo más avanzado, considera integrar servicios como Sentry o LogRocket.

## Dominios personalizados

1. En el dashboard de Vercel, ve a "Settings" > "Domains".
2. Haz clic en "Add" e ingresa tu dominio.
3. Sigue las instrucciones para configurar los registros DNS.
4. Una vez verificado, actualiza `NEXTAUTH_URL` y `NEXT_PUBLIC_APP_URL` con tu dominio personalizado.

---

Si encuentras algún problema durante el despliegue, consulta la [documentación oficial de Vercel](https://vercel.com/docs) o contacta con el equipo de soporte. 