import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Obtener gastos de una familia
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
    const category = searchParams.get("category");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

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

    // Construir la consulta
    const whereClause: any = {
      familyId: familyId,
    };

    // Filtrar por categoría si se proporciona
    if (category) {
      whereClause.category = category;
    }

    // Filtrar por rango de fechas si se proporciona
    if (startDate || endDate) {
      whereClause.date = {};
      
      if (startDate) {
        whereClause.date.gte = new Date(startDate);
      }
      
      if (endDate) {
        whereClause.date.lte = new Date(endDate);
      }
    }

    // Obtener gastos
    const expenses = await prisma.expense.findMany({
      where: whereClause,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.error("Error al obtener gastos:", error);
    return NextResponse.json(
      { error: "Error al obtener gastos" },
      { status: 500 }
    );
  }
}

// Crear un nuevo gasto
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
    const { title, amount, date, description, receipt, category, familyId } = body;

    if (!title || amount === undefined || !date || !category || !familyId) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
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

    // Crear gasto
    const expense = await prisma.expense.create({
      data: {
        title,
        amount: parseFloat(amount.toString()),
        date: new Date(date),
        description: description || null,
        receipt: receipt || null,
        category,
        familyId,
        createdById: session.user.id,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error("Error al crear gasto:", error);
    return NextResponse.json(
      { error: "Error al crear gasto" },
      { status: 500 }
    );
  }
}

// Eliminar un gasto
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
    const expenseId = searchParams.get("id");

    if (!expenseId) {
      return NextResponse.json(
        { error: "Se requiere el ID del gasto" },
        { status: 400 }
      );
    }

    // Obtener el gasto para verificar permisos
    const expense = await prisma.expense.findUnique({
      where: {
        id: expenseId,
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

    if (!expense) {
      return NextResponse.json(
        { error: "Gasto no encontrado" },
        { status: 404 }
      );
    }

    // Verificar que el usuario es el creador o pertenece a la familia
    const isCreator = expense.createdById === session.user.id;
    const isFamilyMember = expense.family.members.length > 0;

    if (!isCreator && !isFamilyMember) {
      return NextResponse.json(
        { error: "No tienes permiso para eliminar este gasto" },
        { status: 403 }
      );
    }

    // Eliminar gasto
    await prisma.expense.delete({
      where: {
        id: expenseId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar gasto:", error);
    return NextResponse.json(
      { error: "Error al eliminar gasto" },
      { status: 500 }
    );
  }
} 