import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Obtener todas las familias del usuario
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    // Obtener familias donde el usuario es miembro
    const families = await prisma.family.findMany({
      where: {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        members: {
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
        },
        _count: {
          select: {
            events: true,
            expenses: true,
            documents: true,
            messages: true,
          },
        },
      },
    });

    return NextResponse.json(families);
  } catch (error) {
    console.error("Error al obtener familias:", error);
    return NextResponse.json(
      { error: "Error al obtener familias" },
      { status: 500 }
    );
  }
}

// Crear una nueva familia
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
    const { name, members } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Se requiere un nombre para la familia" },
        { status: 400 }
      );
    }

    // Crear la familia y añadir al usuario actual como miembro
    const family = await prisma.family.create({
      data: {
        name,
        members: {
          create: [
            {
              userId: session.user.id,
              role: "PARENT", // El creador es un padre/madre
            },
          ],
        },
      },
      include: {
        members: {
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
        },
      },
    });

    // Si se proporcionaron miembros adicionales, invitarlos
    if (members && Array.isArray(members) && members.length > 0) {
      // Aquí se implementaría la lógica para invitar a otros miembros
      // Por ejemplo, enviar emails o crear registros de invitación
    }

    return NextResponse.json(family, { status: 201 });
  } catch (error) {
    console.error("Error al crear familia:", error);
    return NextResponse.json(
      { error: "Error al crear familia" },
      { status: 500 }
    );
  }
}

// Actualizar una familia existente
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, name } = body;

    if (!id || !name) {
      return NextResponse.json(
        { error: "Se requiere ID y nombre de la familia" },
        { status: 400 }
      );
    }

    // Verificar que el usuario es miembro de la familia
    const familyMember = await prisma.familyMember.findFirst({
      where: {
        userId: session.user.id,
        familyId: id,
      },
    });

    if (!familyMember) {
      return NextResponse.json(
        { error: "No tienes permiso para modificar esta familia" },
        { status: 403 }
      );
    }

    // Actualizar la familia
    const updatedFamily = await prisma.family.update({
      where: {
        id,
      },
      data: {
        name,
      },
      include: {
        members: {
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
        },
      },
    });

    return NextResponse.json(updatedFamily);
  } catch (error) {
    console.error("Error al actualizar familia:", error);
    return NextResponse.json(
      { error: "Error al actualizar familia" },
      { status: 500 }
    );
  }
}

// Eliminar una familia
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
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Se requiere el ID de la familia" },
        { status: 400 }
      );
    }

    // Verificar que el usuario es miembro de la familia
    const familyMember = await prisma.familyMember.findFirst({
      where: {
        userId: session.user.id,
        familyId: id,
      },
    });

    if (!familyMember) {
      return NextResponse.json(
        { error: "No tienes permiso para eliminar esta familia" },
        { status: 403 }
      );
    }

    // Eliminar la familia (esto también eliminará todos los registros relacionados debido a las restricciones de clave foránea)
    await prisma.family.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar familia:", error);
    return NextResponse.json(
      { error: "Error al eliminar familia" },
      { status: 500 }
    );
  }
} 