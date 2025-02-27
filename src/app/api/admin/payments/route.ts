import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET - Obtener todos los pagos
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

    // Obtener parámetros de filtrado
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const userId = url.searchParams.get("userId");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    // Construir el objeto de filtrado
    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (userId) {
      filter.userId = userId;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      
      if (startDate) {
        filter.createdAt.gte = new Date(startDate);
      }
      
      if (endDate) {
        filter.createdAt.lte = new Date(endDate);
      }
    }

    // Obtener todos los pagos con sus relaciones
    const payments = await db.payment.findMany({
      where: filter,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    return NextResponse.json(
      { error: "Error al obtener pagos" },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo pago
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
    if (!data.amount || !data.userId || !data.status || !data.paymentMethod) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Verificar que el usuario existe
    const userExists = await db.user.findUnique({
      where: { id: data.userId }
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Crear el pago
    const payment = await db.payment.create({
      data: {
        amount: data.amount,
        status: data.status,
        paymentMethod: data.paymentMethod,
        description: data.description || "",
        userId: data.userId,
        invoiceUrl: data.invoiceUrl || null
      }
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error("Error al crear pago:", error);
    return NextResponse.json(
      { error: "Error al crear pago" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un pago existente
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
    if (!data.id || !data.status) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Verificar que el pago existe
    const existingPayment = await db.payment.findUnique({
      where: { id: data.id }
    });

    if (!existingPayment) {
      return NextResponse.json(
        { error: "Pago no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar el pago
    const updatedPayment = await db.payment.update({
      where: { id: data.id },
      data: {
        status: data.status,
        description: data.description !== undefined ? data.description : existingPayment.description,
        invoiceUrl: data.invoiceUrl !== undefined ? data.invoiceUrl : existingPayment.invoiceUrl
      }
    });

    return NextResponse.json(updatedPayment);
  } catch (error) {
    console.error("Error al actualizar pago:", error);
    return NextResponse.json(
      { error: "Error al actualizar pago" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un pago
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

    // Obtener ID del pago a eliminar
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID de pago no proporcionado" },
        { status: 400 }
      );
    }

    // Verificar que el pago existe
    const existingPayment = await db.payment.findUnique({
      where: { id }
    });

    if (!existingPayment) {
      return NextResponse.json(
        { error: "Pago no encontrado" },
        { status: 404 }
      );
    }

    // Eliminar el pago
    await db.payment.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar pago:", error);
    return NextResponse.json(
      { error: "Error al eliminar pago" },
      { status: 500 }
    );
  }
} 