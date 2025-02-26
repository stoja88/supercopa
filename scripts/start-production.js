// Script para iniciar el proyecto en producción
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
  console.log('Iniciando el proyecto en producción...');
  
  // Ejecutar migraciones de Prisma
  if (!runCommand('npx prisma migrate deploy')) {
    process.exit(1);
  }
  
  // Iniciar el servidor
  if (!runCommand('next start')) {
    process.exit(1);
  }
}

// Ejecutar la función principal
main().catch(e => {
  console.error('Error al iniciar el proyecto:', e);
  process.exit(1);
}); 