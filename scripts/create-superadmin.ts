import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Iniciando creación de usuario superadmin...');
    
    // Datos del superadmin
    const email = 'superadmin@coparentalidad.com';
    const password = 'Admin123!';
    const name = 'Super Administrador';
    
    // Verificar si ya existe un usuario con este email
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      console.log('Ya existe un usuario con este email. Actualizando a rol ADMIN...');
      
      // Actualizar el usuario existente a rol ADMIN
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          role: 'ADMIN',
          name,
          password: hashedPassword
        }
      });
      
      console.log(`Usuario actualizado con éxito: ${updatedUser.email} (${updatedUser.role})`);
      return;
    }
    
    // Crear nuevo usuario superadmin
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newAdmin = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    
    console.log(`Superadmin creado con éxito: ${newAdmin.email} (${newAdmin.role})`);
    console.log('Credenciales:');
    console.log(`- Email: ${email}`);
    console.log(`- Contraseña: ${password}`);
    console.log('Guarda estas credenciales en un lugar seguro.');
    
  } catch (error) {
    console.error('Error al crear superadmin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 