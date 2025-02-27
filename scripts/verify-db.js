// Script para verificar la conexión a la base de datos y probar la autenticación
// Ejecutar con: node scripts/verify-db.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  console.log('=== INICIANDO VERIFICACIÓN DE BASE DE DATOS ===');
  
  try {
    console.log(`Conectando a la base de datos con URL: ${process.env.DATABASE_URL?.substring(0, 30)}...`);
    const prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });

    // Testear conexión
    console.log('Probando conexión...');
    await prisma.$connect();
    console.log('✅ Conexión establecida correctamente');

    // Buscar usuario administrador
    console.log('Buscando usuario administrador...');
    const admin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
      },
    });

    if (!admin) {
      console.log('❌ No se encontró ningún usuario administrador');
    } else {
      console.log(`✅ Usuario administrador encontrado: ${admin.email}`);
      console.log(`   ID: ${admin.id}`);
      console.log(`   Nombre: ${admin.name}`);
      console.log(`   Rol: ${admin.role}`);
      console.log(`   ¿Tiene contraseña?: ${admin.password ? 'Sí' : 'No'}`);
      
      // Comprobar si la contraseña es "admin123"
      if (admin.password) {
        const isCorrect = await bcrypt.compare('admin123', admin.password);
        console.log(`   ¿La contraseña 'admin123' es correcta?: ${isCorrect ? 'Sí' : 'No'}`);
      }
    }

    // Contar usuarios
    const userCount = await prisma.user.count();
    console.log(`Total de usuarios en el sistema: ${userCount}`);

    // Desconectar
    await prisma.$disconnect();
    console.log('Base de datos desconectada');
    
  } catch (error) {
    console.error('❌ ERROR durante la verificación:', error);
    process.exit(1);
  }

  console.log('=== VERIFICACIÓN COMPLETADA ===');
}

main(); 