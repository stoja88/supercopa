import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Datos del superadmin
  const email = 'admin@coparentalidad.com';
  const name = 'Super Admin';
  const password = 'Admin123!'; // Deberías cambiar esto a una contraseña segura
  
  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      console.log(`El usuario con email ${email} ya existe.`);
      
      // Actualizar a rol de administrador si no lo es
      if (existingUser.role !== 'ADMIN') {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { role: 'ADMIN' },
        });
        console.log(`El usuario ${email} ha sido actualizado a ADMIN.`);
      } else {
        console.log(`El usuario ${email} ya tiene rol de ADMIN.`);
      }
    } else {
      // Crear el usuario administrador
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newAdmin = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
      
      console.log(`Usuario administrador creado con éxito:`);
      console.log(`- Email: ${newAdmin.email}`);
      console.log(`- Nombre: ${newAdmin.name}`);
      console.log(`- Rol: ${newAdmin.role}`);
      console.log(`- ID: ${newAdmin.id}`);
      console.log(`\nPuedes iniciar sesión con:`);
      console.log(`- Email: ${email}`);
      console.log(`- Contraseña: ${password}`);
    }
  } catch (error) {
    console.error('Error al crear/actualizar el usuario administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 