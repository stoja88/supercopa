#!/bin/bash

# Colores para mejor legibilidad
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Actualización de Base de Datos y Despliegue a Vercel ===${NC}"

# Paso 1: Generar la migración de Prisma
echo -e "${YELLOW}Generando migración de Prisma...${NC}"
npx prisma migrate dev --name add_mediacion_tables

# Paso 2: Validar el esquema
echo -e "${YELLOW}Validando esquema de Prisma...${NC}"
npx prisma validate

# Paso 3: Generar los tipos de Prisma Client
echo -e "${YELLOW}Generando Prisma Client...${NC}"
npx prisma generate

# Paso 4: Aplicar los cambios a la base de datos
echo -e "${YELLOW}Aplicando cambios a la base de datos...${NC}"
npx prisma migrate deploy

# Paso 5: Construir la aplicación
echo -e "${YELLOW}Construyendo la aplicación...${NC}"
npm run build

# Verificar si hubo errores en la compilación
if [ $? -ne 0 ]; then
  echo -e "${RED}Error al construir la aplicación. Abortando despliegue.${NC}"
  exit 1
fi

# Paso 6: Desplegar a Vercel
echo -e "${YELLOW}Desplegando a Vercel...${NC}"
npx vercel --prod

# Verificar si hubo errores en el despliegue
if [ $? -ne 0 ]; then
  echo -e "${RED}Error al desplegar a Vercel.${NC}"
  exit 1
fi

echo -e "${GREEN}¡Despliegue completado con éxito!${NC}"
echo -e "${GREEN}La actualización de la base de datos y el despliegue a Vercel se han realizado correctamente.${NC}" 