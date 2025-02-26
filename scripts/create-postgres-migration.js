// Script para crear una migración inicial para PostgreSQL
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
  const prodSchemaPath = path.join(__dirname, '..', 'prisma', 'schema.postgres.prisma');
  
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

// Función para restaurar el esquema original
function restoreSchema() {
  const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
  const backupPath = `${schemaPath}.bak`;
  
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, schemaPath);
    fs.unlinkSync(backupPath);
    console.log('Esquema de Prisma restaurado');
    return true;
  }
  
  console.error('No se encontró una copia de seguridad del esquema');
  return false;
}

// Función principal
async function main() {
  console.log('Creando migración inicial para PostgreSQL...');
  
  // Usar el esquema de producción
  if (!useProdSchema()) {
    process.exit(1);
  }
  
  try {
    // Generar el script SQL de migración
    if (!runCommand('npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations_postgresql.sql')) {
      throw new Error('Error al generar el script SQL de migración');
    }
    
    // Crear el directorio de migración
    const migrationsDir = path.join(__dirname, '..', 'prisma', 'migrations');
    const targetDir = path.join(migrationsDir, '20240625000000_initial_postgres');
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Copiar el archivo SQL a la carpeta de migración
    fs.copyFileSync(
      path.join(__dirname, '..', 'prisma', 'migrations_postgresql.sql'),
      path.join(targetDir, 'migration.sql')
    );
    
    // Crear el archivo de configuración
    fs.writeFileSync(
      path.join(targetDir, 'migration.toml'),
      `# Prisma Migrate lockfile v1\n# Read more about conflict resolution here: https://pris.ly/d/migrate-resolve\n\n20240625000000_initial_postgres = "Initial migration for PostgreSQL"`
    );
    
    console.log('Migración inicial para PostgreSQL creada con éxito');
  } finally {
    // Restaurar el esquema original
    restoreSchema();
  }
}

// Ejecutar la función principal
main().catch(e => {
  console.error('Error al crear la migración:', e);
  // Intentar restaurar el esquema original
  restoreSchema();
  process.exit(1);
}); 