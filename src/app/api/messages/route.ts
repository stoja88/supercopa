import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Obtener mensajes de una familia
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

    // Verificar que el usuario pertenece a la familia
    const familyMember = await prisma.familyMember.findFirst({
      where: {
        userId: session.user.id,
        familyId: familyId,
      },
    });

    if (!familyMember) {
      return NextResponse.json(
        { error: "No tienes acceso a esta familia" },
        { status: 403 }
      );
    }

    // Obtener mensajes
    const messages = await prisma.message.findMany({
      where: {
        familyId: familyId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
    return NextResponse.json(
      { error: "Error al obtener mensajes" },
      { status: 500 }
    );
  }
}

// Crear un nuevo mensaje
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
    const { content, familyId } = body;

    if (!content || !familyId) {
      return NextResponse.json(
        { error: "Se requiere contenido y ID de familia" },
        { status: 400 }
      );
    }

    // Verificar que el usuario pertenece a la familia
    const familyMember = await prisma.familyMember.findFirst({
      where: {
        userId: session.user.id,
        familyId: familyId,
      },
    });

    if (!familyMember) {
      return NextResponse.json(
        { error: "No tienes acceso a esta familia" },
        { status: 403 }
      );
    }

    // Crear mensaje
    const message = await prisma.message.create({
      data: {
        content,
        familyId,
        senderId: session.user.id,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error al crear mensaje:", error);
    return NextResponse.json(
      { error: "Error al crear mensaje" },
      { status: 500 }
    );
  }
}

// Marcar mensajes como leídos
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
    const { messageIds } = body;

    if (!messageIds || !Array.isArray(messageIds)) {
      return NextResponse.json(
        { error: "Se requiere un array de IDs de mensajes" },
        { status: 400 }
      );
    }

    // Verificar que el usuario tiene acceso a estos mensajes
    const messages = await prisma.message.findMany({
      where: {
        id: { in: messageIds },
      },
      include: {
        family: {
          include: {
            members: {
              where: {
                userId: session.user.id,
              },
            },
          },
        },
      },
    });

    // Filtrar mensajes a los que el usuario tiene acceso
    const accessibleMessageIds = messages
      .filter((message) => message.family.members.length > 0)
      .map((message) => message.id);

    if (accessibleMessageIds.length === 0) {
      return NextResponse.json(
        { error: "No tienes acceso a estos mensajes" },
        { status: 403 }
      );
    }

    // Marcar mensajes como leídos
    await prisma.message.updateMany({
      where: {
        id: { in: accessibleMessageIds },
        senderId: { not: session.user.id }, // No marcar como leídos los mensajes propios
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al marcar mensajes como leídos:", error);
    return NextResponse.json(
      { error: "Error al marcar mensajes como leídos" },
      { status: 500 }
    );
  }
} 