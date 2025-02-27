import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET - Obtener todos los items del marketplace
export async function GET(req: NextRequest) {
  try {
    // Verificar sesión y permisos
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acceso denegado. Se requieren permisos de administrador." },
        { status: 403 }
      );
    }

    // Obtener items del marketplace
    const items = await db.marketplaceItem.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error al obtener items del marketplace:", error);
    return NextResponse.json(
      { error: "Error al obtener los datos" },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo item en el marketplace
export async function POST(req: NextRequest) {
  try {
    // Verificar sesión y permisos
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acceso denegado. Se requieren permisos de administrador." },
        { status: 403 }
      );
    }

    // Obtener datos del cuerpo de la solicitud
    const data = await req.json();
    
    // Validar datos requeridos
    if (!data.title || !data.description || data.price === undefined || !data.category) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Crear nuevo item
    const newItem = await db.marketplaceItem.create({
      data: {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        category: data.category,
        image: data.image || null,
        featured: data.featured || false
      }
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Error al crear item del marketplace:", error);
    return NextResponse.json(
      { error: "Error al crear el item" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un item existente
export async function PUT(req: NextRequest) {
  try {
    // Verificar sesión y permisos
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acceso denegado. Se requieren permisos de administrador." },
        { status: 403 }
      );
    }

    // Obtener datos del cuerpo de la solicitud
    const data = await req.json();
    
    // Validar ID y datos requeridos
    if (!data.id || !data.title || !data.description || data.price === undefined || !data.category) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Verificar si el item existe
    const existingItem = await db.marketplaceItem.findUnique({
      where: { id: data.id }
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "Item no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar item
    const updatedItem = await db.marketplaceItem.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        category: data.category,
        image: data.image,
        featured: data.featured
      }
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error al actualizar item del marketplace:", error);
    return NextResponse.json(
      { error: "Error al actualizar el item" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un item
export async function DELETE(req: NextRequest) {
  try {
    // Verificar sesión y permisos
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acceso denegado. Se requieren permisos de administrador." },
        { status: 403 }
      );
    }

    // Obtener ID del elemento a eliminar
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Se requiere el ID del item" },
        { status: 400 }
      );
    }

    // Verificar si el item existe
    const existingItem = await db.marketplaceItem.findUnique({
      where: { id }
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "Item no encontrado" },
        { status: 404 }
      );
    }

    // Eliminar item
    await db.marketplaceItem.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar item del marketplace:", error);
    return NextResponse.json(
      { error: "Error al eliminar el item" },
      { status: 500 }
    );
  }
} 