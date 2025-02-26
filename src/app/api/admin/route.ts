import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Función para obtener estadísticas del sistema
export async function GET(req: Request) {
  try {
    // Verificar autenticación y permisos
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }
    
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      );
    }
    
    // Obtener estadísticas
    const [
      totalUsers,
      totalFamilies,
      totalDocuments,
      totalExpenses,
      totalEvents,
      totalMessages
    ] = await Promise.all([
      prisma.user.count(),
      prisma.family.count(),
      prisma.document.count(),
      prisma.expense.count(),
      prisma.event.count(),
      prisma.message.count()
    ]);
    
    // Calcular usuarios activos (ejemplo: usuarios que han iniciado sesión en los últimos 7 días)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const activeUsers = await prisma.session.count({
      where: {
        expires: {
          gte: sevenDaysAgo
        }
      },
      distinct: ['userId']
    });
    
    return NextResponse.json({
      stats: {
        totalUsers,
        totalFamilies,
        totalDocuments,
        totalExpenses,
        totalEvents,
        totalMessages,
        activeUsers
      }
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    return NextResponse.json(
      { error: "Error al obtener estadísticas del sistema" },
      { status: 500 }
    );
  }
}

// Función para obtener usuarios
export async function POST(req: Request) {
  try {
    // Verificar autenticación y permisos
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }
    
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      );
    }
    
    const body = await req.json();
    const { action, data } = body;
    
    // Manejar diferentes acciones administrativas
    switch (action) {
      case "getUsers":
        const users = await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            image: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
        
        return NextResponse.json({ users });
        
      case "getFamilies":
        const families = await prisma.family.findMany({
          select: {
            id: true,
            name: true,
            createdAt: true,
            _count: {
              select: {
                members: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
        
        const formattedFamilies = families.map(family => ({
          id: family.id,
          name: family.name,
          memberCount: family._count.members,
          createdAt: family.createdAt
        }));
        
        return NextResponse.json({ families: formattedFamilies });
        
      case "updateUserRole":
        const { userId, role } = data;
        
        if (!userId || !role) {
          return NextResponse.json(
            { error: "Faltan datos requeridos" },
            { status: 400 }
          );
        }
        
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { role },
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        });
        
        return NextResponse.json({ user: updatedUser });
        
      case "deleteUser":
        const { userIdToDelete } = data;
        
        if (!userIdToDelete) {
          return NextResponse.json(
            { error: "Falta el ID de usuario" },
            { status: 400 }
          );
        }
        
        // Verificar que no se elimine al último administrador
        const adminCount = await prisma.user.count({
          where: { role: "ADMIN" }
        });
        
        const userToDelete = await prisma.user.findUnique({
          where: { id: userIdToDelete },
          select: { role: true }
        });
        
        if (userToDelete?.role === "ADMIN" && adminCount <= 1) {
          return NextResponse.json(
            { error: "No se puede eliminar al último administrador" },
            { status: 400 }
          );
        }
        
        await prisma.user.delete({
          where: { id: userIdToDelete }
        });
        
        return NextResponse.json({ success: true });
        
      case "deleteFamily":
        const { familyId } = data;
        
        if (!familyId) {
          return NextResponse.json(
            { error: "Falta el ID de familia" },
            { status: 400 }
          );
        }
        
        await prisma.family.delete({
          where: { id: familyId }
        });
        
        return NextResponse.json({ success: true });
        
      default:
        return NextResponse.json(
          { error: "Acción no válida" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error en la acción administrativa:", error);
    return NextResponse.json(
      { error: "Error al procesar la acción administrativa" },
      { status: 500 }
    );
  }
} 