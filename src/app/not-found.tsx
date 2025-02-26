"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
  const pathname = usePathname();
  
  // Mapeo de rutas incorrectas a rutas correctas
  const routeMapping: Record<string, string> = {
    "/features": "/",
    "/pricing": "/",
    "/faq": "/",
    "/guides": "/",
    "/blog": "/",
    "/support": "/",
    "/privacy": "/",
    "/terms": "/",
    "/cookies": "/",
  };
  
  // Verificar si la ruta actual está en el mapeo
  const correctRoute = routeMapping[pathname];
  
  // Registrar el error 404 para análisis
  useEffect(() => {
    console.error(`Error 404: Ruta no encontrada - ${pathname}`);
    
    // Aquí podrías enviar el error a un servicio de análisis o logging
  }, [pathname]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 max-w-md"
      >
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Página no encontrada</h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="text-muted-foreground mb-6">
            {correctRoute 
              ? "La página que buscas está disponible en otra ubicación."
              : "Lo sentimos, la página que buscas no existe o ha sido movida."}
          </p>
          
          {correctRoute ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Te recomendamos visitar:
              </p>
              <Button asChild>
                <Link href={correctRoute}>
                  Ir a la página correcta
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Button asChild>
                <Link href="/">
                  Volver al inicio
                </Link>
              </Button>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  ¿Necesitas ayuda? Contacta con nuestro equipo de soporte.
                </p>
                <Button variant="outline" className="mt-2" asChild>
                  <Link href="/dashboard">
                    Ir al dashboard
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
} 