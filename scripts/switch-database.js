// Script para cambiar entre SQLite y PostgreSQL
const fs = require('fs');
const path = require('path');

// Rutas de los archivos
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const sqliteSchemaPath = path.join(__dirname, '..', 'prisma', 'schema.sqlite.prisma');
const postgresSchemaPath = path.join(__dirname, '..', 'prisma', 'schema.postgres.prisma');

// Función para guardar el esquema actual como SQLite o PostgreSQL
function saveCurrentSchema(type) {
  const targetPath = type === 'sqlite' ? sqliteSchemaPath : postgresSchemaPath;
  fs.copyFileSync(schemaPath, targetPath);
  console.log(`Esquema actual guardado como ${type}`);
}

// Función para cambiar al esquema especificado
function switchToSchema(type) {
  const sourcePath = type === 'sqlite' ? sqliteSchemaPath : postgresSchemaPath;
  
  // Verificar si existe el archivo fuente
  if (!fs.existsSync(sourcePath)) {
    console.error(`El archivo ${sourcePath} no existe`);
    return false;
  }
  
  // Hacer una copia de seguridad del esquema actual
  const backupPath = `${schemaPath}.backup`;
  fs.copyFileSync(schemaPath, backupPath);
  
  // Copiar el nuevo esquema
  fs.copyFileSync(sourcePath, schemaPath);
  
  console.log(`Cambiado a esquema ${type}`);
  return true;
}

// Función principal
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Uso: node switch-database.js [save-sqlite|save-postgres|use-sqlite|use-postgres]');
    process.exit(1);
  }
  
  const command = args[0];
  
  switch (command) {
    case 'save-sqlite':
      saveCurrentSchema('sqlite');
      break;
    case 'save-postgres':
      saveCurrentSchema('postgres');
      break;
    case 'use-sqlite':
      if (switchToSchema('sqlite')) {
        console.log('Ahora puedes usar SQLite para desarrollo local');
      }
      break;
    case 'use-postgres':
      if (switchToSchema('postgres')) {
        console.log('Ahora puedes usar PostgreSQL para producción');
      }
      break;
    default:
      console.error('Comando no reconocido');
      console.error('Uso: node switch-database.js [save-sqlite|save-postgres|use-sqlite|use-postgres]');
      process.exit(1);
  }
}

main(); 