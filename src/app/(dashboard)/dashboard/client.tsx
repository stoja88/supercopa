"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import DashboardContent from "@/components/dashboard/dashboard-content";

export default function DashboardClient() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular un tiempo de carga para asegurar que todos los componentes se inicialicen correctamente
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-2 text-red-600">Error al cargar el dashboard</h1>
        <p className="text-muted-foreground mb-4">
          Ha ocurrido un error al cargar el panel. Por favor, intente recargar la página.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm overflow-auto">
          {error.message}
        </pre>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Recargar página
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container-custom py-8 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Cargando Dashboard...</h1>
        <p className="text-muted-foreground">
          Por favor espere mientras cargamos su panel de co-parentalidad.
        </p>
      </div>
    );
  }

  try {
    return <DashboardContent />;
  } catch (err) {
    console.error("Error al renderizar DashboardContent:", err);
    setError(err instanceof Error ? err : new Error(String(err)));
    return null;
  }
} 