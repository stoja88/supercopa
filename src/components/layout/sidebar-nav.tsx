"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";
import {
  Calendar,
  MessageSquare,
  FileText,
  DollarSign,
  Users,
  Settings,
  Home,
  ShoppingBag
} from "lucide-react";

interface SidebarNavProps {
  session: Session | null;
}

export function SidebarNav({ session }: SidebarNavProps) {
  const pathname = usePathname();
  
  const routes = [
    {
      href: "/dashboard",
      label: "Inicio",
      icon: <Home className="h-5 w-5" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/calendar",
      label: "Calendario",
      icon: <Calendar className="h-5 w-5" />,
      active: pathname === "/dashboard/calendar",
    },
    {
      href: "/dashboard/messages",
      label: "Mensajes",
      icon: <MessageSquare className="h-5 w-5" />,
      active: pathname === "/dashboard/messages",
    },
    {
      href: "/dashboard/documents",
      label: "Documentos",
      icon: <FileText className="h-5 w-5" />,
      active: pathname === "/dashboard/documents",
    },
    {
      href: "/dashboard/expenses",
      label: "Gastos",
      icon: <DollarSign className="h-5 w-5" />,
      active: pathname === "/dashboard/expenses",
    },
    {
      href: "/marketplace",
      label: "Marketplace",
      icon: <ShoppingBag className="h-5 w-5" />,
      active: pathname === "/marketplace",
    },
  ];

  // Rutas de administrador
  const adminRoutes = [
    {
      href: "/dashboard/admin",
      label: "Administración",
      icon: <Users className="h-5 w-5" />,
      active: pathname === "/dashboard/admin",
    },
  ];

  // Rutas de configuración
  const settingsRoutes = [
    {
      href: "/dashboard/settings",
      label: "Configuración",
      icon: <Settings className="h-5 w-5" />,
      active: pathname === "/dashboard/settings",
    },
  ];

  return (
    <nav className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
              route.active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground"
            )}
          >
            {route.icon}
            {route.label}
          </Link>
        ))}
      </div>

      {session?.user?.role === "ADMIN" && (
        <div className="flex flex-col gap-1">
          <div className="px-3 py-2">
            <h3 className="mb-1 text-xs font-medium">Administración</h3>
          </div>
          {adminRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                route.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <div className="px-3 py-2">
          <h3 className="mb-1 text-xs font-medium">Configuración</h3>
        </div>
        {settingsRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
              route.active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground"
            )}
          >
            {route.icon}
            {route.label}
          </Link>
        ))}
      </div>
    </nav>
  );
} 