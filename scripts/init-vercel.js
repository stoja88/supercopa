// Script para inicializar el proyecto en Vercel
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Función para ejecutar comandos y mostrar la salida
function runCommand(command) {
  try {
    console.log(`Ejecutando: ${command}`);
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return { success: true, output };
  } catch (error) {
    console.error(`Error al ejecutar: ${command}`);
    console.error(error.stdout);
    console.error(error.stderr);
    return { success: false, error };
  }
}

// Función para preguntar al usuario
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

// Función principal
async function main() {
  console.log('Inicializando el proyecto en Vercel...');
  
  // Verificar si el usuario está autenticado en Vercel
  const loginResult = runCommand('vercel whoami');
  if (!loginResult.success) {
    console.log('No has iniciado sesión en Vercel. Iniciando sesión...');
    runCommand('vercel login');
  } else {
    console.log(`Estás autenticado en Vercel como: ${loginResult.output.trim()}`);
  }
  
  // Preguntar si desea crear una base de datos Postgres
  const createDb = await askQuestion('¿Deseas crear una base de datos Postgres en Vercel? (s/n): ');
  
  if (createDb.toLowerCase() === 's') {
    console.log('Creando base de datos Postgres en Vercel...');
    console.log('NOTA: Este paso requiere que tengas instalado Vercel CLI y hayas iniciado sesión.');
    console.log('Ejecuta los siguientes comandos manualmente:');
    console.log('1. vercel link (para vincular el proyecto)');
    console.log('2. vercel env pull .env.production.local (para obtener las variables de entorno)');
    console.log('3. vercel storage create postgres coparentalidad-db (para crear la base de datos)');
    
    // Preguntar si desea continuar
    const continuar = await askQuestion('¿Has completado estos pasos? (s/n): ');
    
    if (continuar.toLowerCase() !== 's') {
      console.log('Proceso detenido. Por favor, completa los pasos manualmente y vuelve a ejecutar este script.');
      return;
    }
  }
  
  // Guardar el esquema de PostgreSQL
  console.log('Guardando el esquema de PostgreSQL...');
  runCommand('node scripts/switch-database.js save-postgres');
  
  // Crear la migración inicial para PostgreSQL
  console.log('Creando la migración inicial para PostgreSQL...');
  runCommand('node scripts/create-postgres-migration.js');
  
  // Volver a SQLite para desarrollo local
  console.log('Volviendo a SQLite para desarrollo local...');
  runCommand('node scripts/switch-database.js use-sqlite');
  
  console.log('Proyecto inicializado correctamente para Vercel.');
  console.log('Para desplegar el proyecto, ejecuta:');
  console.log('vercel');
  console.log('Para desplegar a producción, ejecuta:');
  console.log('vercel --prod');
}

// Ejecutar la función principal
main().catch(e => {
  console.error('Error al inicializar el proyecto:', e);
  process.exit(1);
}); 