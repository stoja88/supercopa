import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Obtener miembros de una familia
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const familyId = searchParams.get("familyId");

    if (!familyId) {
      return NextResponse.json(
        { error: "Se requiere el ID de la familia" },
        { status: 400 }
      );
    }

    // Verificar que el usuario es miembro de la familia
    const userMembership = await prisma.familyMember.findFirst({
      where: {
        userId: session.user.id,
        familyId,
      },
    });

    if (!userMembership) {
      return NextResponse.json(
        { error: "No tienes acceso a esta familia" },
        { status: 403 }
      );
    }

    // Obtener todos los miembros de la familia
    const members = await prisma.familyMember.findMany({
      where: {
        familyId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error("Error al obtener miembros:", error);
    return NextResponse.json(
      { error: "Error al obtener miembros" },
      { status: 500 }
    );
  }
}

// Añadir un miembro a la familia
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { familyId, email, role } = body;

    if (!familyId || !email || !role) {
      return NextResponse.json(
        { error: "Se requieren todos los campos: familyId, email y role" },
        { status: 400 }
      );
    }

    // Verificar que el usuario actual es miembro de la familia
    const userMembership = await prisma.familyMember.findFirst({
      where: {
        userId: session.user.id,
        familyId,
      },
    });

    if (!userMembership) {
      return NextResponse.json(
        { error: "No tienes permiso para añadir miembros a esta familia" },
        { status: 403 }
      );
    }

    // Buscar al usuario por email
    const userToAdd = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userToAdd) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Verificar si el usuario ya es miembro de la familia
    const existingMembership = await prisma.familyMember.findFirst({
      where: {
        userId: userToAdd.id,
        familyId,
      },
    });

    if (existingMembership) {
      return NextResponse.json(
        { error: "El usuario ya es miembro de esta familia" },
        { status: 400 }
      );
    }

    // Añadir al usuario como miembro de la familia
    const newMember = await prisma.familyMember.create({
      data: {
        userId: userToAdd.id,
        familyId,
        role,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error("Error al añadir miembro:", error);
    return NextResponse.json(
      { error: "Error al añadir miembro" },
      { status: 500 }
    );
  }
}

// Eliminar un miembro de la familia
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get("id");

    if (!memberId) {
      return NextResponse.json(
        { error: "Se requiere el ID del miembro" },
        { status: 400 }
      );
    }

    // Obtener información del miembro a eliminar
    const memberToDelete = await prisma.familyMember.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!memberToDelete) {
      return NextResponse.json(
        { error: "Miembro no encontrado" },
        { status: 404 }
      );
    }

    // Verificar que el usuario actual es miembro de la misma familia
    const userMembership = await prisma.familyMember.findFirst({
      where: {
        userId: session.user.id,
        familyId: memberToDelete.familyId,
      },
    });

    if (!userMembership) {
      return NextResponse.json(
        { error: "No tienes permiso para eliminar miembros de esta familia" },
        { status: 403 }
      );
    }

    // No permitir que un usuario se elimine a sí mismo
    if (memberToDelete.userId === session.user.id) {
      return NextResponse.json(
        { error: "No puedes eliminarte a ti mismo de la familia" },
        { status: 400 }
      );
    }

    // Eliminar al miembro
    await prisma.familyMember.delete({
      where: {
        id: memberId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar miembro:", error);
    return NextResponse.json(
      { error: "Error al eliminar miembro" },
      { status: 500 }
    );
  }
}

// Actualizar el rol de un miembro
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { memberId, role } = body;

    if (!memberId || !role) {
      return NextResponse.json(
        { error: "Se requieren todos los campos: memberId y role" },
        { status: 400 }
      );
    }

    // Obtener información del miembro a actualizar
    const memberToUpdate = await prisma.familyMember.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!memberToUpdate) {
      return NextResponse.json(
        { error: "Miembro no encontrado" },
        { status: 404 }
      );
    }

    // Verificar que el usuario actual es miembro de la misma familia
    const userMembership = await prisma.familyMember.findFirst({
      where: {
        userId: session.user.id,
        familyId: memberToUpdate.familyId,
      },
    });

    if (!userMembership) {
      return NextResponse.json(
        { error: "No tienes permiso para actualizar miembros de esta familia" },
        { status: 403 }
      );
    }

    // Actualizar el rol del miembro
    const updatedMember = await prisma.familyMember.update({
      where: {
        id: memberId,
      },
      data: {
        role,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error("Error al actualizar miembro:", error);
    return NextResponse.json(
      { error: "Error al actualizar miembro" },
      { status: 500 }
    );
  }
} 