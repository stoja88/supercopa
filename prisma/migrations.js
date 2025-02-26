// Script para ejecutar migraciones de Prisma en producción
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

// Función principal
async function main() {
  console.log('Iniciando migraciones de Prisma...');
  
  // Generar el cliente de Prisma
  if (!runCommand('npx prisma generate')) {
    process.exit(1);
  }
  
  // Ejecutar las migraciones
  if (!runCommand('npx prisma migrate deploy')) {
    process.exit(1);
  }
  
  console.log('Migraciones completadas con éxito.');
}

// Ejecutar la función principal
main().catch(e => {
  console.error('Error en el script de migraciones:', e);
  process.exit(1);
}); 