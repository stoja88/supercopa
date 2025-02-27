#!/bin/bash

# Colores para mejor legibilidad
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Despliegue a Vercel ===${NC}"

# Verificar si el usuario está autenticado en Vercel
echo -e "${YELLOW}Verificando autenticación en Vercel...${NC}"
if ! npx vercel whoami &>/dev/null; then
  echo -e "${RED}No estás autenticado en Vercel. Por favor, ejecuta 'vercel login' primero.${NC}"
  exit 1
fi

# Instalar dependencias
echo -e "${YELLOW}Instalando dependencias...${NC}"
npm install

# Generar el cliente de Prisma
echo -e "${YELLOW}Generando Prisma Client...${NC}"
npx prisma generate

# Construir la aplicación
echo -e "${YELLOW}Construyendo la aplicación...${NC}"
npm run build

# Verificar si hubo errores en la compilación
if [ $? -ne 0 ]; then
  echo -e "${RED}Error al construir la aplicación. Abortando despliegue.${NC}"
  exit 1
fi

# Preguntar al usuario si quiere ejecutar las migraciones
read -p "¿Deseas ejecutar las migraciones de Prisma? (s/n): " run_migrations
if [[ "$run_migrations" =~ ^[Ss]$ ]]; then
  echo -e "${YELLOW}Ejecutando migraciones de Prisma...${NC}"
  npx prisma migrate deploy
  
  # Verificar si hubo errores en las migraciones
  if [ $? -ne 0 ]; then
    echo -e "${RED}Error al ejecutar las migraciones. ¿Deseas continuar con el despliegue? (s/n): ${NC}"
    read -p "" continue_deploy
    if [[ ! "$continue_deploy" =~ ^[Ss]$ ]]; then
      echo -e "${RED}Despliegue abortado.${NC}"
      exit 1
    fi
  fi
fi

# Desplegar a Vercel
echo -e "${YELLOW}Desplegando a Vercel...${NC}"
npx vercel --prod

# Verificar si hubo errores en el despliegue
if [ $? -ne 0 ]; then
  echo -e "${RED}Error al desplegar a Vercel.${NC}"
  exit 1
fi

echo -e "${GREEN}¡Despliegue completado con éxito!${NC}"
echo -e "${BLUE}Para ver tu aplicación, visita la URL proporcionada por Vercel.${NC}" 