import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET - Obtener estadísticas
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
    const period = url.searchParams.get("period") || "month";

    // Calcular fechas según el período
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case "all":
        startDate = new Date(0); // Desde el inicio de los tiempos (1970)
        break;
      default:
        startDate.setMonth(now.getMonth() - 1); // Por defecto, último mes
    }

    // Estadísticas de usuarios
    const totalUsers = await db.user.count();
    const newUsers = await db.user.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    });
    const activeUsers = await db.session.count({
      where: {
        expires: {
          gte: now
        }
      }
    });

    // Estadísticas de ingresos
    const payments = await db.payment.findMany({
      where: {
        status: "completed",
        createdAt: {
          gte: startDate
        }
      },
      select: {
        amount: true
      }
    });
    
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

    // Estadísticas de marketplace
    const totalMarketplaceItems = await db.marketplaceItem.count();
    const featuredMarketplaceItems = await db.marketplaceItem.count({
      where: {
        featured: true
      }
    });

    // Estadísticas de abogados
    const totalLawyers = await db.lawyer.count();
    const verifiedLawyers = await db.lawyer.count({
      where: {
        isVerified: true
      }
    });

    // Estadísticas de planes de suscripción
    const subscriptionPlans = await db.subscriptionPlan.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            users: true
          }
        }
      }
    });

    const formattedSubscriptions = subscriptionPlans.map(plan => ({
      id: plan.id,
      name: plan.name,
      userCount: plan._count.users
    }));

    // Construir objeto de respuesta
    const stats = {
      users: {
        total: totalUsers,
        new: newUsers,
        active: activeUsers
      },
      revenue: {
        total: totalRevenue,
        period: period
      },
      marketplace: {
        total: totalMarketplaceItems,
        featured: featuredMarketplaceItems
      },
      lawyers: {
        total: totalLawyers,
        verified: verifiedLawyers
      },
      subscriptions: formattedSubscriptions
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    );
  }
}
