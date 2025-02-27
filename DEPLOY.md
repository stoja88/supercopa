# Instrucciones para Actualizar la Base de Datos y Desplegar a Vercel

Este documento proporciona instrucciones detalladas sobre cómo actualizar la base de datos con las nuevas tablas para la funcionalidad de mediación y cómo desplegar la aplicación actualizada a Vercel.

## Requisitos Previos

1. Tener instalado Node.js (versión 14 o superior) y npm
2. Tener una cuenta en Vercel y estar autenticado localmente (`vercel login`)
3. Tener acceso a la base de datos (credenciales en el archivo `.env`)

## Opción 1: Usando el Script Automatizado

Hemos preparado un script que automatiza todo el proceso de migración y despliegue:

1. Abra una terminal en la raíz del proyecto
2. Haga el script ejecutable:
   ```bash
   chmod +x db-deploy.sh
   ```
3. Ejecute el script:
   ```bash
   ./db-deploy.sh
   ```

El script realizará las siguientes acciones:
- Generar y aplicar las migraciones de Prisma
- Validar el esquema de la base de datos
- Generar el cliente de Prisma
- Construir la aplicación
- Desplegar a Vercel

## Opción 2: Proceso Manual

Si prefiere realizar el proceso manualmente o si el script automatizado falla, siga estos pasos:

### 1. Actualizar la Base de Datos

1. Genere una nueva migración:
   ```bash
   npx prisma migrate dev --name add_mediacion_tables
   ```

2. Valide el esquema:
   ```bash
   npx prisma validate
   ```

3. Genere el cliente de Prisma:
   ```bash
   npx prisma generate
   ```

4. Aplique los cambios a la base de datos:
   ```bash
   npx prisma migrate deploy
   ```

### 2. Construir y Desplegar la Aplicación

1. Construya la aplicación:
   ```bash
   npm run build
   ```

2. Despliegue a Vercel:
   ```bash
   npx vercel --prod
   ```

## Verificación del Despliegue

Una vez completado el despliegue, verifique que todo funciona correctamente:

1. Visite la URL de la aplicación proporcionada por Vercel
2. Inicie sesión como mediador y verifique que puede acceder al dashboard
3. Compruebe que todas las nuevas funcionalidades de mediación funcionan como se espera

## Solución de Problemas

Si encuentra algún problema durante el despliegue:

1. **Error en las migraciones**:
   - Verifique que la conexión a la base de datos es correcta
   - Revise los logs de Prisma para identificar el problema específico

2. **Error en la construcción**:
   - Revise los mensajes de error en la consola
   - Asegúrese de que todas las dependencias estén instaladas (`npm install`)

3. **Error en el despliegue a Vercel**:
   - Verifique que está autenticado en Vercel (`vercel login`)
   - Revise los logs de despliegue en el dashboard de Vercel

Para cualquier asistencia adicional, contacte al equipo de desarrollo. 