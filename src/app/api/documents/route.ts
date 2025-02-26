import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Obtener documentos de una familia
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const familyId = searchParams.get("familyId");
    const category = searchParams.get("category");

    if (familyId) {
      const isMember = await prisma.familyMember.findFirst({
        where: {
          familyId: familyId,
          userId: session.user.id,
        },
      });
      
      if (!isMember && session.user.role !== "ADMIN") {
        return NextResponse.json(
          { error: "No tienes permiso para acceder a estos documentos" },
          { status: 403 }
        );
      }
    } else {
      const userFamilies = await prisma.familyMember.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          familyId: true,
        },
      });
      
      const familyIds = userFamilies.map(family => family.familyId);
      
      if (familyIds.length === 0 && session.user.role !== "ADMIN") {
        return NextResponse.json({ documents: [] });
      }
      
      if (session.user.role !== "ADMIN") {
        whereClause.familyId = {
          in: familyIds,
        };
      }
    }

    if (category) {
      whereClause.category = category;
    }

    // Obtener documentos
    const documents = await prisma.document.findMany({
      where: whereClause,
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        family: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    return NextResponse.json(
      { error: "Error al obtener documentos" },
      { status: 500 }
    );
  }
}

// Crear un nuevo documento
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, fileUrl, fileType, familyId, category } = body;

    if (!title || !fileUrl || !fileType || !familyId || !category) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    const isMember = await prisma.familyMember.findFirst({
      where: {
        familyId: familyId,
        userId: session.user.id,
      },
    });
    
    if (!isMember && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "No tienes permiso para añadir documentos a esta familia" },
        { status: 403 }
      );
    }

    // Crear documento
    const document = await prisma.document.create({
      data: {
        title,
        description,
        fileUrl,
        fileType,
        category,
        uploaderId: session.user.id,
        familyId,
      },
    });

    return NextResponse.json({ document });
  } catch (error) {
    console.error("Error al crear documento:", error);
    return NextResponse.json(
      { error: "Error al crear documento" },
      { status: 500 }
    );
  }
}

// Eliminar un documento
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("id");

    if (!documentId) {
      return NextResponse.json(
        { error: "ID de documento no proporcionado" },
        { status: 400 }
      );
    }

    // Obtener documento
    const document = await prisma.document.findUnique({
      where: {
        id: documentId,
      },
      include: {
        family: {
          include: {
            members: {
              where: {
                userId: session.user.id,
                role: {
                  in: ["ADMIN", "PARENT"],
                },
              },
            },
          },
        },
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Documento no encontrado" },
        { status: 404 }
      );
    }

    // Verificar permisos
    const isUploader = document.uploaderId === session.user.id;
    const isFamilyAdmin = document.family.members.length > 0;
    const isSystemAdmin = session.user.role === "ADMIN";
    
    if (!isUploader && !isFamilyAdmin && !isSystemAdmin) {
      return NextResponse.json(
        { error: "No tienes permiso para eliminar este documento" },
        { status: 403 }
      );
    }

    // Eliminar documento
    await prisma.document.delete({
      where: {
        id: documentId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar documento:", error);
    return NextResponse.json(
      { error: "Error al eliminar documento" },
      { status: 500 }
    );
  }
} 