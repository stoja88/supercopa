"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  
  // Verificar el estado de la sesión al cargar la página
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Verificar si hay una sesión almacenada en localStorage
        const storedSession = localStorage.getItem("userSession");
        const sessionExpiry = localStorage.getItem("sessionExpiry");
        
        // Si no hay sesión o ha expirado, limpiar localStorage
        if (!storedSession || !sessionExpiry || new Date(sessionExpiry) < new Date()) {
          localStorage.removeItem("userSession");
          localStorage.removeItem("sessionExpiry");
          
          // Si estamos en una ruta protegida, redirigir al login
          if (pathname.includes("/dashboard") && !pathname.includes("/login")) {
            router.push("/login");
          }
        } else {
          // Renovar la expiración de la sesión
          const newExpiry = new Date();
          newExpiry.setHours(newExpiry.getHours() + 24); // Extender 24 horas
          localStorage.setItem("sessionExpiry", newExpiry.toISOString());
          
          // Si estamos en la página de login pero hay una sesión válida, redirigir al dashboard
          if (pathname === "/login") {
            router.push("/dashboard");
          }
        }
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Configurar un intervalo para verificar la sesión periódicamente
    const intervalId = setInterval(checkSession, 5 * 60 * 1000); // Cada 5 minutos
    
    // Configurar listeners para eventos de actividad del usuario
    const resetSessionTimer = () => {
      const newExpiry = new Date();
      newExpiry.setHours(newExpiry.getHours() + 24); // Extender 24 horas
      localStorage.setItem("sessionExpiry", newExpiry.toISOString());
    };
    
    window.addEventListener("click", resetSessionTimer);
    window.addEventListener("keypress", resetSessionTimer);
    window.addEventListener("scroll", resetSessionTimer);
    window.addEventListener("mousemove", resetSessionTimer);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("click", resetSessionTimer);
      window.removeEventListener("keypress", resetSessionTimer);
      window.removeEventListener("scroll", resetSessionTimer);
      window.removeEventListener("mousemove", resetSessionTimer);
    };
  }, [pathname, router]);
  
  // Interceptar eventos de cierre de sesión
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userSession" && e.newValue === null) {
        // La sesión fue eliminada en otra pestaña
        if (pathname.includes("/dashboard")) {
          router.push("/login");
        }
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [pathname, router]);
  
  // Interceptar errores de red que podrían afectar a la sesión
  useEffect(() => {
    const handleOnline = () => {
      // Cuando la conexión se restablece, verificar la sesión
      const checkSession = async () => {
        try {
          const response = await fetch("/api/auth/session");
          if (!response.ok) {
            // Si hay un error en la respuesta, limpiar la sesión
            localStorage.removeItem("userSession");
            localStorage.removeItem("sessionExpiry");
            if (pathname.includes("/dashboard")) {
              router.push("/login");
            }
          }
        } catch (error) {
          console.error("Error al verificar la sesión:", error);
        }
      };
      
      checkSession();
    };
    
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [pathname, router]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Cargando sesión...</span>
      </div>
    );
  }
  
  return (
    <NextAuthSessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
      {children}
    </NextAuthSessionProvider>
  );
} 