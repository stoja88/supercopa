# CoParentalidad

CoParentalidad es una aplicación web diseñada para ayudar a familias separadas a gestionar la crianza compartida de sus hijos de manera efectiva y armoniosa. La plataforma facilita la comunicación, la planificación de eventos, la gestión de documentos y el seguimiento de gastos entre los miembros de la familia.

## Características

- **Gestión de Familias**: Crear y administrar perfiles familiares con múltiples miembros.
- **Calendario Compartido**: Programar y coordinar eventos, visitas y actividades importantes.
- **Mensajería Interna**: Comunicación segura y organizada entre los miembros de la familia.
- **Gestión de Documentos**: Almacenamiento y compartición de documentos importantes.
- **Seguimiento de Gastos**: Registro y división de gastos relacionados con los hijos.
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

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/coparentalidad.git
   cd coparentalidad
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   - Copia el archivo `.env.example` a `.env`
   - Completa las variables necesarias (conexión a base de datos, claves de API, etc.)

4. Configurar la base de datos:
   ```bash
   npx prisma migrate dev
   ```

5. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

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
