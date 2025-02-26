// Script para configurar la base de datos en Vercel
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
  console.log('Configurando la base de datos en Vercel...');
  
  // Verificar si estamos en Vercel
  if (!process.env.VERCEL) {
    console.log('Este script está diseñado para ejecutarse en Vercel. Saliendo...');
    return;
  }
  
  // Verificar si tenemos las variables de entorno necesarias
  if (!process.env.POSTGRES_PRISMA_URL && !process.env.POSTGRES_URL_NON_POOLING && !process.env.DATABASE_URL) {
    console.error('No se encontraron las variables de entorno de base de datos');
    console.log('Continuando con el build sin configurar la base de datos...');
    return;
  }
  
  console.log('Variables de entorno de base de datos encontradas');
  
  try {
    console.log('Generando el cliente de Prisma...');
    
    // Generar el cliente de Prisma
    if (!runCommand('npx prisma generate')) {
      console.error('Error al generar el cliente de Prisma');
      process.exit(1);
    }
    
    console.log('Cliente de Prisma generado con éxito');
    
    // Si tenemos la URL de la base de datos, intentamos ejecutar las migraciones
    if (process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL) {
      console.log('Ejecutando migraciones de Prisma...');
      
      try {
        // Ejecutar las migraciones
        runCommand('npx prisma migrate deploy');
        console.log('Migraciones ejecutadas con éxito');
      } catch (error) {
        console.error('Error al ejecutar las migraciones, pero continuando con el build...');
      }
    }
    
    console.log('Base de datos configurada con éxito en Vercel');
  } catch (error) {
    console.error('Error al configurar la base de datos:', error);
    console.log('Continuando con el build...');
  }
}

// Ejecutar la función principal
main().catch(e => {
  console.error('Error al configurar la base de datos:', e);
  console.log('Continuando con el build...');
}); 