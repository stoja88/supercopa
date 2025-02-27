# Scripts de Administración para Coparentalidad

Este directorio contiene scripts útiles para la administración de la plataforma Coparentalidad.

## Configuración de Superadmin

Los scripts en este directorio te permiten crear un usuario con permisos de administrador (superadmin) y verificar la conexión a la base de datos.

### Requisitos previos

- Node.js (v14 o superior)
- npm (v6 o superior)
- Acceso a la base de datos PostgreSQL configurada en el archivo `.env`

### Instrucciones de uso

#### En sistemas Unix (Linux/macOS)

1. Asegúrate de estar en el directorio raíz del proyecto:
   ```bash
   cd /ruta/a/coparentalidad
   ```

2. Haz el script ejecutable:
   ```bash
   chmod +x scripts/setup-admin.sh
   ```

3. Ejecuta el script:
   ```bash
   ./scripts/setup-admin.sh
   ```

#### En sistemas Windows

1. Asegúrate de estar en el directorio raíz del proyecto:
   ```cmd
   cd \ruta\a\coparentalidad
   ```

2. Ejecuta el script:
   ```cmd
   scripts\setup-admin.bat
   ```

### ¿Qué hacen estos scripts?

1. **create-superadmin.ts**: Crea un usuario con rol de administrador (ADMIN) en la base de datos. Si el usuario ya existe, actualiza su rol a ADMIN.

2. **verify-database.ts**: Verifica la conexión a la base de datos y muestra estadísticas sobre los datos almacenados, incluyendo una lista de todos los usuarios registrados.

### Credenciales del Superadmin

Después de ejecutar el script, se creará un usuario superadmin con las siguientes credenciales:

- **Email**: superadmin@coparentalidad.com
- **Contraseña**: Admin123!

**IMPORTANTE**: Por seguridad, se recomienda cambiar la contraseña después del primer inicio de sesión.

### Acceso al Panel de Administración

Una vez creado el usuario superadmin, puedes acceder al panel de administración en:

```
https://coparentalidad-jpvkx82m7-stoja88s-projects.vercel.app/login
```

Después de iniciar sesión, navega a:

```
https://coparentalidad-jpvkx82m7-stoja88s-projects.vercel.app/dashboard/admin
```

## Solución de problemas

Si encuentras algún error al ejecutar los scripts, verifica lo siguiente:

1. Asegúrate de que el archivo `.env` existe y contiene la URL de conexión correcta a la base de datos.
2. Verifica que tienes permisos para acceder a la base de datos.
3. Asegúrate de que la base de datos está en funcionamiento y es accesible.
4. Comprueba que las dependencias están instaladas ejecutando `npm install`.

Si sigues teniendo problemas, consulta los mensajes de error específicos que se muestran en la consola para obtener más información. 