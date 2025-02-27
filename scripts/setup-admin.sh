#!/bin/bash

# Colores para la salida
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Configuración de Superadmin para Coparentalidad ===${NC}"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: Este script debe ejecutarse desde el directorio raíz del proyecto.${NC}"
  echo "Por favor, ejecuta: cd /ruta/a/coparentalidad && ./scripts/setup-admin.sh"
  exit 1
fi

# Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
  echo -e "${RED}Error: Node.js no está instalado.${NC}"
  echo "Por favor, instala Node.js desde https://nodejs.org/"
  exit 1
fi

# Verificar que npm está instalado
if ! command -v npm &> /dev/null; then
  echo -e "${RED}Error: npm no está instalado.${NC}"
  echo "Por favor, instala npm (normalmente viene con Node.js)"
  exit 1
fi

echo -e "${YELLOW}Paso 1: Verificando dependencias...${NC}"
# Verificar si bcryptjs está instalado
npm list bcryptjs > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo -e "Instalando bcryptjs..."
  npm install bcryptjs
fi

echo -e "\n${YELLOW}Paso 2: Creando usuario superadmin...${NC}"
node scripts/create-superadmin.js

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: No se pudo crear el usuario superadmin.${NC}"
  exit 1
fi

echo -e "\n${YELLOW}Paso 3: Verificando la base de datos...${NC}"
node scripts/verify-database.js

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: No se pudo verificar la base de datos.${NC}"
  exit 1
fi

echo -e "\n${GREEN}¡Configuración completada con éxito!${NC}"
echo -e "Ahora puedes iniciar sesión en el panel de administración con las credenciales proporcionadas."
echo -e "URL: https://coparentalidad-jpvkx82m7-stoja88s-projects.vercel.app/login" 