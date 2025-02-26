# Configuración del Repositorio en GitHub

Sigue estos pasos para subir el proyecto a GitHub:

## 1. Crear un Repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión en tu cuenta.
2. Haz clic en el botón "+" en la esquina superior derecha y selecciona "New repository".
3. Nombra el repositorio "coparentalidad" (o el nombre que prefieras).
4. Puedes añadir una descripción opcional: "Plataforma para la gestión de la coparentalidad".
5. Elige si quieres que el repositorio sea público o privado.
6. **NO** inicialices el repositorio con README, .gitignore o licencia, ya que ya tenemos estos archivos.
7. Haz clic en "Create repository".

## 2. Conectar el Repositorio Local con GitHub

Una vez creado el repositorio en GitHub, ejecuta los siguientes comandos en tu terminal:

```bash
# Reemplaza 'TU_USUARIO' con tu nombre de usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/coparentalidad.git

# Sube el código al repositorio remoto
git push -u origin master
```

Si prefieres usar SSH en lugar de HTTPS, usa este comando para añadir el remoto:

```bash
# Reemplaza 'TU_USUARIO' con tu nombre de usuario de GitHub
git remote add origin git@github.com:TU_USUARIO/coparentalidad.git
```

## 3. Verificar la Configuración

Para verificar que el repositorio remoto se ha configurado correctamente:

```bash
git remote -v
```

Deberías ver algo como:

```
origin  https://github.com/TU_USUARIO/coparentalidad.git (fetch)
origin  https://github.com/TU_USUARIO/coparentalidad.git (push)
```

## 4. Cambiar el Nombre de la Rama Principal (Opcional)

Si prefieres usar 'main' en lugar de 'master' como nombre de la rama principal:

```bash
# Renombrar la rama localmente
git branch -m master main

# Subir la rama con el nuevo nombre y configurarla para seguimiento
git push -u origin main

# Eliminar la rama 'master' del repositorio remoto (si ya la has subido)
git push origin --delete master
```

## 5. Configuración Adicional

### Proteger la Rama Principal

1. Ve a la página de tu repositorio en GitHub.
2. Haz clic en "Settings" > "Branches".
3. En "Branch protection rules", haz clic en "Add rule".
4. En "Branch name pattern", escribe "master" o "main" (según el nombre de tu rama principal).
5. Selecciona las opciones de protección que desees, como requerir revisiones de pull requests.
6. Haz clic en "Create" o "Save changes".

### Configurar GitHub Actions (Opcional)

Si deseas configurar CI/CD con GitHub Actions, puedes crear un archivo de flujo de trabajo en `.github/workflows/`. Esto se puede hacer más adelante según tus necesidades específicas. 