import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Crear un cliente mock si las credenciales no están configuradas
let supabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL o clave anónima no configuradas correctamente");
  
  // Cliente mock para entorno de desarrollo/construcción
  supabaseClient = {
    storage: {
      from: () => ({
        upload: async () => ({ data: { path: "mock-path" }, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "https://ejemplo.com/mock-file.pdf" } }),
        remove: async () => ({ error: null })
      })
    }
  };
} else {
  // Cliente real de Supabase
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;

/**
 * Sube un archivo a Supabase Storage
 */
export async function uploadFile(
  file: File,
  bucket: string,
  path: string
): Promise<string | null> {
  try {
    // Si estamos usando el cliente mock, devolver una URL de ejemplo
    if (!supabaseUrl || !supabaseAnonKey) {
      return "https://ejemplo.com/mock-file.pdf";
    }
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`${path}/${file.name}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Error al subir archivo:", error);
      return null;
    }

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(`${path}/${file.name}`);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error al subir archivo:", error);
    return null;
  }
}

/**
 * Elimina un archivo de Supabase Storage
 */
export async function deleteFile(
  bucket: string,
  path: string
): Promise<boolean> {
  try {
    // Si estamos usando el cliente mock, simular éxito
    if (!supabaseUrl || !supabaseAnonKey) {
      return true;
    }
    
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      console.error("Error al eliminar archivo:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    return false;
  }
} 