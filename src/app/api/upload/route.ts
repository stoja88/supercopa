import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const familyId = formData.get("familyId") as string;
    const folder = formData.get("folder") as string || "documents";

    if (!file || !familyId) {
      return NextResponse.json(
        { error: "Se requiere un archivo y el ID de la familia" },
        { status: 400 }
      );
    }

    // Generar un nombre de archivo único
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${familyId}/${fileName}`;

    // Convertir el archivo a un ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Subir a Supabase
    const { data, error } = await supabase.storage
      .from("coparentalidad")
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error al subir archivo a Supabase:", error);
      return NextResponse.json(
        { error: "Error al subir archivo" },
        { status: 500 }
      );
    }

    // Obtener la URL pública
    const { data: urlData } = supabase.storage
      .from("coparentalidad")
      .getPublicUrl(filePath);

    return NextResponse.json({
      url: urlData.publicUrl,
      fileName: file.name,
      fileType: file.type,
      size: file.size,
    });
  } catch (error) {
    console.error("Error al procesar la subida:", error);
    return NextResponse.json(
      { error: "Error al procesar la subida" },
      { status: 500 }
    );
  }
} 