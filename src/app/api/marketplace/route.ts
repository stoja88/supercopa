import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Obtener todos los items del marketplace (endpoint público)
export async function GET(req: NextRequest) {
  try {
    // Obtener parámetros de consulta opcionales
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    
    // Construir la consulta
    const query: any = {};
    
    // Filtrar por categoría si se proporciona
    if (category) {
      query.category = category;
    }
    
    // Filtrar por destacados si se solicita
    if (featured === "true") {
      query.featured = true;
    }
    
    // Obtener items del marketplace
    const items = await db.marketplaceItem.findMany({
      where: query,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ]
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