import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET - Obtener todos los abogados
export async function GET(req: NextRequest) {
  try {
    // Verificar autenticación y permisos
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar si el usuario es administrador
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    // Obtener todos los abogados con sus relaciones
    const lawyers = await db.lawyer.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        services: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(lawyers);
  } catch (error) {
    console.error("Error al obtener abogados:", error);
    return NextResponse.json(
      { error: "Error al obtener abogados" },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo abogado
export async function POST(req: NextRequest) {
  try {
    // Verificar autenticación y permisos
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar si el usuario es administrador
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    // Obtener datos del cuerpo de la solicitud
    const data = await req.json();

    // Validar campos requeridos
    if (!data.userId || !data.bio || !data.specialties || !data.education || !data.experience || !data.location) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Crear el abogado
    const lawyer = await db.lawyer.create({
      data: {
        userId: data.userId,
        bio: data.bio,
        specialties: data.specialties,
        isVerified: data.isVerified || false,
        education: data.education,
        experience: data.experience,
        languages: data.languages || [],
        areas: data.areas || [],
        availability: data.availability || "",
        location: data.location,
        website: data.website || null
      }
    });

    // Crear servicios si se proporcionan
    if (data.services && Array.isArray(data.services) && data.services.length > 0) {
      await Promise.all(
        data.services.map((service: any) =>
          db.service.create({
            data: {
              title: service.title,
              description: service.description,
              price: service.price,
              duration: service.duration,
              lawyerId: lawyer.id
            }
          })
        )
      );
    }

    return NextResponse.json(lawyer, { status: 201 });
  } catch (error) {
    console.error("Error al crear abogado:", error);
    return NextResponse.json(
      { error: "Error al crear abogado" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un abogado existente
export async function PUT(req: NextRequest) {
  try {
    // Verificar autenticación y permisos
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar si el usuario es administrador
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    // Obtener datos del cuerpo de la solicitud
    const data = await req.json();

    // Validar ID y campos requeridos
    if (!data.id || !data.bio || !data.education || !data.experience || !data.location) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Verificar que el abogado existe
    const existingLawyer = await db.lawyer.findUnique({
      where: { id: data.id }
    });

    if (!existingLawyer) {
      return NextResponse.json(
        { error: "Abogado no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar el abogado
    const updatedLawyer = await db.lawyer.update({
      where: { id: data.id },
      data: {
        bio: data.bio,
        specialties: data.specialties || [],
        isVerified: data.isVerified !== undefined ? data.isVerified : existingLawyer.isVerified,
        education: data.education,
        experience: data.experience,
        languages: data.languages || [],
        areas: data.areas || [],
        availability: data.availability || "",
        location: data.location,
        website: data.website || null
      }
    });

    return NextResponse.json(updatedLawyer);
  } catch (error) {
    console.error("Error al actualizar abogado:", error);
    return NextResponse.json(
      { error: "Error al actualizar abogado" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un abogado
export async function DELETE(req: NextRequest) {
  try {
    // Verificar autenticación y permisos
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar si el usuario es administrador
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    // Obtener ID del abogado a eliminar
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID de abogado no proporcionado" },
        { status: 400 }
      );
    }

    // Verificar que el abogado existe
    const existingLawyer = await db.lawyer.findUnique({
      where: { id }
    });

    if (!existingLawyer) {
      return NextResponse.json(
        { error: "Abogado no encontrado" },
        { status: 404 }
      );
    }

    // Eliminar servicios asociados
    await db.service.deleteMany({
      where: { lawyerId: id }
    });

    // Eliminar reseñas asociadas
    await db.review.deleteMany({
      where: { lawyerId: id }
    });

    // Eliminar el abogado
    await db.lawyer.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar abogado:", error);
    return NextResponse.json(
      { error: "Error al eliminar abogado" },
      { status: 500 }
    );
  }
} 