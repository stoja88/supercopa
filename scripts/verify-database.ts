import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Verificando conexión a la base de datos...');
    
    // Verificar la conexión ejecutando una consulta simple
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Conexión a la base de datos establecida correctamente');
    
    // Obtener estadísticas de la base de datos
    console.log('\n📊 Estadísticas de la base de datos:');
    
    // Contar usuarios
    const userCount = await prisma.user.count();
    console.log(`- Usuarios registrados: ${userCount}`);
    
    // Contar familias
    const familyCount = await prisma.family.count();
    console.log(`- Familias creadas: ${familyCount}`);
    
    // Contar mensajes
    const messageCount = await prisma.message.count();
    console.log(`- Mensajes enviados: ${messageCount}`);
    
    // Contar eventos
    const eventCount = await prisma.event.count();
    console.log(`- Eventos programados: ${eventCount}`);
    
    // Contar documentos
    const documentCount = await prisma.document.count();
    console.log(`- Documentos subidos: ${documentCount}`);
    
    // Contar gastos
    const expenseCount = await prisma.expense.count();
    console.log(`- Gastos registrados: ${expenseCount}`);
    
    // Listar usuarios
    console.log('\n👥 Lista de usuarios registrados:');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    if (users.length === 0) {
      console.log('No hay usuarios registrados en la base de datos.');
    } else {
      users.forEach((user, index) => {
        console.log(`\nUsuario #${index + 1}:`);
        console.log(`- ID: ${user.id}`);
        console.log(`- Nombre: ${user.name || 'No especificado'}`);
        console.log(`- Email: ${user.email}`);
        console.log(`- Rol: ${user.role}`);
        console.log(`- Fecha de registro: ${user.createdAt.toLocaleString()}`);
      });
    }
    
    // Verificar si existe un usuario administrador
    const adminUsers = users.filter(user => user.role === 'ADMIN');
    
    if (adminUsers.length === 0) {
      console.log('\n⚠️ No hay usuarios con rol de administrador.');
      console.log('Ejecuta el script create-superadmin.ts para crear un usuario administrador.');
    } else {
      console.log(`\n✅ Se encontraron ${adminUsers.length} usuarios con rol de administrador.`);
    }
    
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 