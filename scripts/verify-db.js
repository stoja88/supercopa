// Verificar conexión a la base de datos y existencia de usuario superadmin
const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('Verificando conexión a la base de datos...');
  
  const prisma = new PrismaClient();
  
  try {
    // Verificar la conexión a la base de datos
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    
    // Verificar la existencia del usuario superadmin
    const superadmin = await prisma.user.findFirst({
      where: {
        email: 'superadmin@coparentalidad.com',
      },
    });
    
    if (superadmin) {
      console.log('✅ Usuario superadmin encontrado:');
      console.log(`   - ID: ${superadmin.id}`);
      console.log(`   - Email: ${superadmin.email}`);
      console.log(`   - Rol: ${superadmin.role}`);
      console.log(`   - Creado: ${superadmin.createdAt}`);
    } else {
      console.log('❌ Usuario superadmin no encontrado. Creando usuario...');
      
      // Crear usuario superadmin si no existe
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      
      const newSuperadmin = await prisma.user.create({
        data: {
          name: 'Super Administrador',
          email: 'superadmin@coparentalidad.com',
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
      
      console.log('✅ Superadmin creado con éxito:');
      console.log(`   - ID: ${newSuperadmin.id}`);
      console.log(`   - Email: ${newSuperadmin.email}`);
      console.log(`   - Rol: ${newSuperadmin.role}`);
    }
    
    // Mostrar todos los usuarios
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      }
    });
    
    console.log('\n📋 Lista de todos los usuarios:');
    allUsers.forEach((user, index) => {
      console.log(`\nUsuario ${index + 1}:`);
      console.log(`   - ID: ${user.id}`);
      console.log(`   - Email: ${user.email}`);
      console.log(`   - Rol: ${user.role}`);
      console.log(`   - Creado: ${user.createdAt}`);
    });
    
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}); 