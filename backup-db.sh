#!/bin/bash

# Colores para mejor legibilidad
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Carpeta donde se guardarán los backups
BACKUP_DIR="./database-backups"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.sql"

# Asegurarse de que la carpeta de backups existe
mkdir -p "$BACKUP_DIR"

echo -e "${BLUE}=== Backup de Base de Datos ===${NC}"

# Verificar si existe el archivo .env con la URL de la base de datos
if [ ! -f .env ]; then
    echo -e "${RED}No se encontró el archivo .env${NC}"
    echo "¿Deseas especificar la URL de la base de datos manualmente? (s/n)"
    read -p "" manual_url
    if [[ "$manual_url" =~ ^[Ss]$ ]]; then
        echo "Introduce la URL de la base de datos PostgreSQL:"
        read -p "" DATABASE_URL
    else
        echo -e "${RED}No se puede continuar sin la URL de la base de datos.${NC}"
        exit 1
    fi
else
    # Extraer la URL de la base de datos del archivo .env
    DATABASE_URL=$(grep DATABASE_URL .env | cut -d '=' -f2)
    if [ -z "$DATABASE_URL" ]; then
        echo -e "${RED}No se encontró DATABASE_URL en el archivo .env${NC}"
        echo "¿Deseas especificar la URL de la base de datos manualmente? (s/n)"
        read -p "" manual_url
        if [[ "$manual_url" =~ ^[Ss]$ ]]; then
            echo "Introduce la URL de la base de datos PostgreSQL:"
            read -p "" DATABASE_URL
        else
            echo -e "${RED}No se puede continuar sin la URL de la base de datos.${NC}"
            exit 1
        fi
    fi
fi

# Extraer información de la conexión
DB_URI=$DATABASE_URL
DB_HOST=$(echo $DB_URI | sed -n 's/.*@\([^:]*\).*/\1/p')
DB_PORT=$(echo $DB_URI | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_NAME=$(echo $DB_URI | sed -n 's/.*\/\([^?]*\).*/\1/p')
DB_USER=$(echo $DB_URI | sed -n 's/.*:\/\/\([^:]*\).*/\1/p')
DB_PASS=$(echo $DB_URI | sed -n 's/.*:\/\/[^:]*:\([^@]*\).*/\1/p')

echo -e "${YELLOW}Realizando backup de la base de datos $DB_NAME...${NC}"

# Realizar el backup utilizando pg_dump
PGPASSWORD="$DB_PASS" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -F p > "$BACKUP_FILE"

# Verificar si el backup fue exitoso
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Backup realizado con éxito: $BACKUP_FILE${NC}"
    
    # Comprimir el archivo
    echo -e "${YELLOW}Comprimiendo el archivo de backup...${NC}"
    gzip "$BACKUP_FILE"
    
    # Verificar si la compresión fue exitosa
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Backup comprimido: $BACKUP_FILE.gz${NC}"
        
        # Listar los backups existentes
        echo -e "${BLUE}Backups disponibles:${NC}"
        ls -lh "$BACKUP_DIR"
    else
        echo -e "${RED}Error al comprimir el backup.${NC}"
    fi
else
    echo -e "${RED}Error al realizar el backup.${NC}"
    exit 1
fi

# Eliminar backups antiguos (mantener solo los últimos 5)
echo -e "${YELLOW}Eliminando backups antiguos...${NC}"
ls -t "$BACKUP_DIR"/*.gz | tail -n +6 | xargs -r rm

echo -e "${GREEN}¡Proceso de backup completado con éxito!${NC}" 