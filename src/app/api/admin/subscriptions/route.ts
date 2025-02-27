import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET - Obtener todos los planes de suscripción
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

    // Obtener todos los planes de suscripción con el conteo de usuarios
    const subscriptions = await db.subscriptionPlan.findMany({
      include: {
        _count: {
          select: { users: true }
        }
      },
      orderBy: {
        price: 'asc'
      }
    });

    // Formatear la respuesta para incluir el conteo de usuarios
    const formattedSubscriptions = subscriptions.map(subscription => ({
      ...subscription,
      userCount: subscription._count.users
    }));

    return NextResponse.json(formattedSubscriptions);
  } catch (error) {
    console.error("Error al obtener planes de suscripción:", error);
    return NextResponse.json(
      { error: "Error al obtener planes de suscripción" },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo plan de suscripción
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
    if (!data.name || !data.description || !data.price || !data.interval) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Crear el plan de suscripción
    const subscription = await db.subscriptionPlan.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        interval: data.interval,
        features: data.features || [],
        isActive: data.isActive !== undefined ? data.isActive : true
      }
    });

    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
    console.error("Error al crear plan de suscripción:", error);
    return NextResponse.json(
      { error: "Error al crear plan de suscripción" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un plan de suscripción existente
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
    if (!data.id || !data.name || !data.description || !data.price || !data.interval) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Verificar que el plan existe
    const existingPlan = await db.subscriptionPlan.findUnique({
      where: { id: data.id }
    });

    if (!existingPlan) {
      return NextResponse.json(
        { error: "Plan de suscripción no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar el plan de suscripción
    const updatedPlan = await db.subscriptionPlan.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        interval: data.interval,
        features: data.features || [],
        isActive: data.isActive !== undefined ? data.isActive : existingPlan.isActive
      }
    });

    return NextResponse.json(updatedPlan);
  } catch (error) {
    console.error("Error al actualizar plan de suscripción:", error);
    return NextResponse.json(
      { error: "Error al actualizar plan de suscripción" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un plan de suscripción
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

    // Obtener ID del plan a eliminar
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID de plan no proporcionado" },
        { status: 400 }
      );
    }

    // Verificar que el plan existe
    const existingPlan = await db.subscriptionPlan.findUnique({
      where: { id },
      include: {
        _count: {
          select: { users: true }
        }
      }
    });

    if (!existingPlan) {
      return NextResponse.json(
        { error: "Plan de suscripción no encontrado" },
        { status: 404 }
      );
    }

    // Verificar si hay usuarios con este plan
    if (existingPlan._count.users > 0) {
      return NextResponse.json(
        { error: "No se puede eliminar un plan con usuarios activos" },
        { status: 400 }
      );
    }

    // Eliminar el plan de suscripción
    await db.subscriptionPlan.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar plan de suscripción:", error);
    return NextResponse.json(
      { error: "Error al eliminar plan de suscripción" },
      { status: 500 }
    );
  }
} 