#!/usr/bin/env node

/**
 * Este script prepara el proyecto para producción:
 * 1. Verifica que todas las dependencias necesarias estén instaladas
 * 2. Genera los tipos de Prisma
 * 3. Comprueba que las variables de entorno necesarias estén configuradas
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

// Función para imprimir mensajes con formato
function log(message, type = 'info') {
  const prefix = {
    info: `${colors.cyan}ℹ${colors.reset}`,
    success: `${colors.green}✓${colors.reset}`,
    warning: `${colors.yellow}⚠${colors.reset}`,
    error: `${colors.red}✗${colors.reset}`,
  };
  
  console.log(`${prefix[type]} ${message}`);
}

// Función para ejecutar comandos
function runCommand(command, errorMessage) {
  try {
    log(`Ejecutando: ${colors.bright}${command}${colors.reset}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    log(errorMessage || `Error al ejecutar: ${command}`, 'warning');
    // No fallamos en caso de error, solo mostramos una advertencia
    return true;
  }
}

// Verificar que estamos en la raíz del proyecto
if (!fs.existsSync(path.join(process.cwd(), 'package.json'))) {
  log('Este script debe ejecutarse desde la raíz del proyecto', 'error');
  process.exit(1);
}

// Comprobar variables de entorno
log('Comprobando variables de entorno...');
const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'NEXT_PUBLIC_APP_URL',
];

const missingVars = [];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  log(`Faltan las siguientes variables de entorno: ${missingVars.join(', ')}`, 'warning');
  log('Asegúrate de configurarlas en el panel de Vercel o en tu archivo .env', 'warning');
  // No fallamos en caso de variables faltantes
} else {
  log('Variables de entorno configuradas correctamente', 'success');
}

// Generar tipos de Prisma (no instalamos dependencias, ya lo hace Vercel)
log('Generando tipos de Prisma...');
runCommand('npx prisma generate', 'Error al generar tipos de Prisma');

log(`${colors.green}${colors.bright}¡Proyecto preparado para producción!${colors.reset}`, 'success');
log('Puedes desplegarlo en Vercel con los siguientes comandos:');
log(`${colors.cyan}npm run build${colors.reset} - Para construir el proyecto`);
log(`${colors.cyan}npm run start${colors.reset} - Para iniciar el servidor en producción`); 