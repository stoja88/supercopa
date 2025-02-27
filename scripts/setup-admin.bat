@echo off
setlocal

echo === Configuración de Superadmin para Coparentalidad ===
echo.

REM Verificar que estamos en el directorio correcto
if not exist "package.json" (
  echo Error: Este script debe ejecutarse desde el directorio raíz del proyecto.
  echo Por favor, ejecuta: cd \ruta\a\coparentalidad ^&^& scripts\setup-admin.bat
  exit /b 1
)

REM Verificar que Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo Error: Node.js no está instalado.
  echo Por favor, instala Node.js desde https://nodejs.org/
  exit /b 1
)

REM Verificar que npm está instalado
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo Error: npm no está instalado.
  echo Por favor, instala npm (normalmente viene con Node.js)
  exit /b 1
)

echo Paso 1: Verificando dependencias...
call npm list bcryptjs >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo Instalando bcryptjs...
  call npm install bcryptjs
)

echo.
echo Paso 2: Creando usuario superadmin...
call node scripts/create-superadmin.js
if %ERRORLEVEL% neq 0 (
  echo Error: No se pudo crear el usuario superadmin.
  exit /b 1
)

echo.
echo Paso 3: Verificando la base de datos...
call node scripts/verify-database.js
if %ERRORLEVEL% neq 0 (
  echo Error: No se pudo verificar la base de datos.
  exit /b 1
)

echo.
echo ¡Configuración completada con éxito!
echo Ahora puedes iniciar sesión en el panel de administración con las credenciales proporcionadas.
echo URL: https://coparentalidad-jpvkx82m7-stoja88s-projects.vercel.app/login

endlocal 