# SuperCopa - Fork de CoParentalidad

Este es un fork del proyecto CoParentalidad con mejoras adicionales:

- Corrección de errores en la interfaz de usuario
- Optimización del rendimiento del dashboard
- Mejoras en la experiencia de usuario

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/stoja88/supercopa.git

# Entrar al directorio
cd supercopa

# Instalar dependencias
npm install

# Generar Prisma Client
npx prisma generate

# Iniciar en desarrollo
npm run dev
```

## Despliegue

Para desplegar en Vercel:

```bash
npm run build
npx vercel --prod
```

## Características principales

- Autenticación segura con NextAuth.js
- Dashboard interactivo para co-parentalidad
- Gestión de documentos compartidos
- Calendario familiar compartido
- Sistema de mensajería entre co-padres

## Características

- **Gestión de Familias**: Crear y administrar perfiles familiares con múltiples miembros.
- **Calendario Compartido**: Programar y coordinar eventos, visitas y actividades importantes.
- **Mensajería Interna**: Comunicación segura y organizada entre los miembros de la familia.
- **Gestión de Documentos**: Almacenamiento y compartición de documentos importantes.
- **Seguimiento de Gastos**: Registro y división de gastos relacionados con los hijos.
- **Mediación Familiar**: Plataforma para mediadores legales que facilita la resolución de conflictos.
- **Panel de Administración**: Gestión completa de usuarios y contenido para administradores.
- **Suscripciones**: Diferentes planes de suscripción con características específicas (próximamente).

## Tecnologías

- **Frontend**: Next.js 14, React, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Base de Datos**: PostgreSQL
- **Autenticación**: NextAuth.js
- **Pagos**: Stripe (implementación futura)

## Requisitos Previos

- Node.js 18.x o superior
- PostgreSQL

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
# Base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/coparentalidad"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secreto-seguro"

# Email (opcional)
EMAIL_SERVER_HOST="smtp.ejemplo.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="usuario@ejemplo.com"
EMAIL_SERVER_PASSWORD="contraseña"
EMAIL_FROM="noreply@ejemplo.com"
```

Nota: La configuración de Stripe para pagos se implementará en una fase posterior.

## Despliegue

Para instrucciones detalladas sobre cómo desplegar la aplicación en Vercel, consulta el archivo [DEPLOY.md](./DEPLOY.md).

## Desarrollo

### Estructura del Proyecto

```
coparentalidad/
├── prisma/              # Esquema de base de datos y migraciones
├── public/              # Archivos estáticos
├── src/
│   ├── app/             # Rutas y páginas de Next.js
│   │   ├── (auth)/      # Rutas de autenticación
│   │   ├── (dashboard)/ # Rutas del panel de control
│   │   ├── api/         # Rutas de API
│   ├── components/      # Componentes React
│   ├── lib/             # Utilidades y configuraciones
│   ├── types/           # Definiciones de tipos TypeScript
├── .env                 # Variables de entorno (no incluido en el repositorio)
├── .env.example         # Ejemplo de variables de entorno
└── ...                  # Otros archivos de configuración
```

### Comandos Útiles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm start`: Inicia la aplicación en modo producción
- `npx prisma studio`: Abre la interfaz de Prisma Studio para gestionar la base de datos
- `npx prisma migrate dev`: Aplica migraciones de base de datos en desarrollo
- `npx prisma migrate deploy`: Aplica migraciones en producción

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Soporte

Para soporte o preguntas, por favor contacta a [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com).

## Scripts de Utilidad

El proyecto incluye varios scripts para facilitar el desarrollo y el despliegue:

### `db-deploy.sh`

Script para actualizar la base de datos y desplegar la aplicación en Vercel:

```bash
chmod +x db-deploy.sh
./db-deploy.sh
```

### `vercel-deploy.sh`

Script específico para el despliegue en Vercel:

```bash
chmod +x vercel-deploy.sh
./vercel-deploy.sh
```

### `backup-db.sh`

Script para realizar backups automáticos de la base de datos:

```bash
chmod +x backup-db.sh
./backup-db.sh
```

Para más información sobre estos scripts, consulta el archivo [DEPLOY.md](./DEPLOY.md).

## Módulo de Mediación Familiar

El módulo de mediación permite a profesionales legales gestionar casos de mediación familiar:

- **Gestión de Casos**: Registro y seguimiento de casos de mediación.
- **Gestión de Sesiones**: Programación y documentación de sesiones de mediación.
- **Documentos Compartidos**: Almacenamiento y compartición de documentos legales.
- **Comunicación Segura**: Canal de comunicación entre mediadores y partes involucradas.
- **Notas Privadas**: Espacio para que los mediadores registren notas privadas sobre los casos.
