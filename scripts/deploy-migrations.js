// Script para ejecutar las migraciones en producción
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

// Función para crear la migración inicial
function createInitialMigration() {
  const migrationsDir = path.join(__dirname, '..', 'prisma', 'migrations');
  const migrationSqlPath = path.join(__dirname, '..', 'prisma', 'migrations_postgresql.sql');
  const targetDir = path.join(migrationsDir, '20240625000000_initial_postgres');
  
  // Verificar si existe el archivo de migración SQL
  if (!fs.existsSync(migrationSqlPath)) {
    console.error('No se encontró el archivo de migración SQL');
    return false;
  }
  
  // Crear el directorio de destino
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Copiar el archivo SQL
  fs.copyFileSync(
    migrationSqlPath,
    path.join(targetDir, 'migration.sql')
  );
  
  // Crear el archivo de configuración
  fs.writeFileSync(
    path.join(targetDir, 'migration.toml'),
    `# Prisma Migrate lockfile v1\n# Read more about conflict resolution here: https://pris.ly/d/migrate-resolve\n\n20240625000000_initial_postgres = "Initial migration for PostgreSQL"`
  );
  
  console.log('Migración inicial creada con éxito');
  
  return true;
}

// Función principal
async function main() {
  console.log('Ejecutando migraciones en producción...');
  
  // Generar el cliente de Prisma
  if (!runCommand('npx prisma generate')) {
    process.exit(1);
  }
  
  // Crear la migración inicial si es necesario
  if (!createInitialMigration()) {
    process.exit(1);
  }
  
  // Ejecutar las migraciones
  if (!runCommand('npx prisma migrate deploy')) {
    process.exit(1);
  }
  
  console.log('Migraciones ejecutadas con éxito');
}

// Ejecutar la función principal
main().catch(e => {
  console.error('Error al ejecutar las migraciones:', e);
  process.exit(1);
}); 