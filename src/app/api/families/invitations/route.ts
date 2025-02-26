import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Obtener invitaciones del usuario actual
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    // Obtener invitaciones pendientes para el usuario
    const invitations = await prisma.familyInvitation.findMany({
      where: {
        email: session.user.email,
        status: "PENDING",
      },
      include: {
        family: true,
        invitedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(invitations);
  } catch (error) {
    console.error("Error al obtener invitaciones:", error);
    return NextResponse.json(
      { error: "Error al obtener invitaciones" },
      { status: 500 }
    );
  }
}

// Crear una nueva invitación
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
        { error: "No tienes permiso para invitar a esta familia" },
        { status: 403 }
      );
    }

    // Verificar si el usuario ya es miembro de la familia
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      const existingMembership = await prisma.familyMember.findFirst({
        where: {
          userId: existingUser.id,
          familyId,
        },
      });

      if (existingMembership) {
        return NextResponse.json(
          { error: "El usuario ya es miembro de esta familia" },
          { status: 400 }
        );
      }
    }

    // Verificar si ya existe una invitación pendiente
    const existingInvitation = await prisma.familyInvitation.findFirst({
      where: {
        familyId,
        email,
        status: "PENDING",
      },
    });

    if (existingInvitation) {
      return NextResponse.json(
        { error: "Ya existe una invitación pendiente para este email" },
        { status: 400 }
      );
    }

    // Crear la invitación
    const invitation = await prisma.familyInvitation.create({
      data: {
        familyId,
        email,
        role,
        invitedById: session.user.id,
        status: "PENDING",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
      },
      include: {
        family: true,
        invitedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    // Aquí se podría implementar el envío de un email de invitación

    return NextResponse.json(invitation, { status: 201 });
  } catch (error) {
    console.error("Error al crear invitación:", error);
    return NextResponse.json(
      { error: "Error al crear invitación" },
      { status: 500 }
    );
  }
}

// Aceptar o rechazar una invitación
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
    const { invitationId, action } = body;

    if (!invitationId || !action || !["ACCEPT", "REJECT"].includes(action)) {
      return NextResponse.json(
        { error: "Se requieren todos los campos: invitationId y action (ACCEPT o REJECT)" },
        { status: 400 }
      );
    }

    // Obtener la invitación
    const invitation = await prisma.familyInvitation.findUnique({
      where: {
        id: invitationId,
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Invitación no encontrada" },
        { status: 404 }
      );
    }

    // Verificar que la invitación es para el usuario actual
    if (invitation.email !== session.user.email) {
      return NextResponse.json(
        { error: "Esta invitación no es para ti" },
        { status: 403 }
      );
    }

    // Verificar que la invitación está pendiente
    if (invitation.status !== "PENDING") {
      return NextResponse.json(
        { error: "Esta invitación ya ha sido procesada" },
        { status: 400 }
      );
    }

    // Verificar que la invitación no ha expirado
    if (invitation.expiresAt && new Date(invitation.expiresAt) < new Date()) {
      await prisma.familyInvitation.update({
        where: {
          id: invitationId,
        },
        data: {
          status: "EXPIRED",
        },
      });

      return NextResponse.json(
        { error: "Esta invitación ha expirado" },
        { status: 400 }
      );
    }

    if (action === "ACCEPT") {
      // Añadir al usuario como miembro de la familia
      await prisma.familyMember.create({
        data: {
          userId: session.user.id,
          familyId: invitation.familyId,
          role: invitation.role,
        },
      });

      // Actualizar el estado de la invitación
      await prisma.familyInvitation.update({
        where: {
          id: invitationId,
        },
        data: {
          status: "ACCEPTED",
        },
      });

      return NextResponse.json({ success: true, message: "Invitación aceptada" });
    } else {
      // Rechazar la invitación
      await prisma.familyInvitation.update({
        where: {
          id: invitationId,
        },
        data: {
          status: "REJECTED",
        },
      });

      return NextResponse.json({ success: true, message: "Invitación rechazada" });
    }
  } catch (error) {
    console.error("Error al procesar invitación:", error);
    return NextResponse.json(
      { error: "Error al procesar invitación" },
      { status: 500 }
    );
  }
} 