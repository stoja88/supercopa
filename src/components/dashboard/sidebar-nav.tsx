"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calendar, 
  MessageSquare, 
  FileText, 
  DollarSign, 
  BookOpen, 
  Users, 
  Settings, 
  Home,
  CreditCard
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn(
            "justify-start",
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline"
          )}
          asChild
        >
          <Link href={item.href}>
            <span className="mr-2">{item.icon}</span>
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

export const dashboardNavItems = [
  {
    title: "Inicio",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Calendario",
    href: "/dashboard/calendario",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Mensajes",
    href: "/dashboard/mensajes",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    title: "Documentos",
    href: "/dashboard/documentos",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Gastos",
    href: "/dashboard/gastos",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    title: "Recursos",
    href: "/dashboard/recursos",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    title: "Familia",
    href: "/dashboard/familia",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Suscripción",
    href: "/dashboard/subscription",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    title: "Configuración",
    href: "/dashboard/configuracion",
    icon: <Settings className="h-4 w-4" />,
  },
]; 