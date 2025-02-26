import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 1 minuto (máximo permitido en plan hobby)

export async function GET(request: Request) {
  try {
    // Verificar que la solicitud proviene de Vercel Cron
    const authHeader = request.headers.get('Authorization');
    if (
      process.env.VERCEL_ENV === 'production' &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Eliminar sesiones expiradas (más de 30 días)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { count } = await prisma.session.deleteMany({
      where: {
        expires: {
          lt: thirtyDaysAgo,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Se eliminaron ${count} sesiones expiradas`,
    });
  } catch (error) {
    console.error('Error al limpiar sesiones:', error);
    return NextResponse.json(
      { error: 'Error al limpiar sesiones' },
      { status: 500 }
    );
  }
} 