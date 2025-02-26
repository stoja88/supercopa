// Script para preparar el despliegue en Vercel
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Función para ejecutar comandos y mostrar la salida
function runCommand(command) {
  try {
    console.log(`Ejecutando: ${command}`);
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Error al ejecutar: ${command}`);
    console.error(error.stdout);
    console.error(error.stderr);
    return false;
  }
}

// Función para usar el esquema de producción
function useProdSchema() {
  const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
  const prodSchemaPath = path.join(__dirname, '..', 'prisma', 'production.schema.prisma');
  
  // Verificar si existe el esquema de producción
  if (!fs.existsSync(prodSchemaPath)) {
    console.error('No se encontró el esquema de producción');
    return false;
  }
  
  // Hacer una copia de seguridad del esquema actual
  fs.copyFileSync(schemaPath, `${schemaPath}.bak`);
  
  // Copiar el esquema de producción
  fs.copyFileSync(prodSchemaPath, schemaPath);
  
  console.log('Esquema de Prisma actualizado para producción');
  
  return true;
}

// Función principal
async function main() {
  console.log('Preparando el proyecto para el despliegue en Vercel...');
  
  // Usar el esquema de producción
  if (!useProdSchema()) {
    process.exit(1);
  }
  
  // Generar el cliente de Prisma
  if (!runCommand('npx prisma generate')) {
    process.exit(1);
  }
  
  console.log('Proyecto listo para el despliegue en Vercel');
}

// Ejecutar la función principal
main().catch(e => {
  console.error('Error en el script de preparación:', e);
  process.exit(1);
}); 