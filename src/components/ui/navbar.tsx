import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu, X, User, Calendar, MessageSquare, FileText, DollarSign, BookOpen, LogOut, Settings, CreditCard } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Inicio", href: "/dashboard" },
  { name: "Calendario", href: "/dashboard/calendario" },
  { name: "Mensajes", href: "/dashboard/mensajes" },
  { name: "Documentos", href: "/dashboard/documentos" },
  { name: "Gastos", href: "/dashboard/gastos" },
  { name: "Recursos", href: "/dashboard/recursos" },
  { name: "Suscripción", href: "/dashboard/subscription" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Verificar si el usuario es administrador
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="bg-white shadow dark:bg-gray-900">
      <nav className="container-custom mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">CoParent</span>
            </Link>
            <div className="hidden md:ml-10 md:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "nav-link",
                      pathname === item.href
                        ? "nav-link-active"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Enlace al panel de administración para usuarios con rol ADMIN */}
                {isAdmin && (
                  <Link
                    href="/dashboard/admin"
                    className={cn(
                      "nav-link",
                      pathname === "/dashboard/admin"
                        ? "nav-link-active"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    Administración
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {session ? (
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Link href="/dashboard/perfil">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{session.user.name}</span>
                  </Button>
                </Link>
                {/* Botón de administración para móviles */}
                {isAdmin && (
                  <Link href="/dashboard/admin">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Admin</span>
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar sesión</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Link href="/login">
                  <Button variant="ghost">Iniciar sesión</Button>
                </Link>
                <Link href="/register">
                  <Button>Registrarse</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Enlace de administración para móviles */}
            {isAdmin && (
              <Link
                href="/dashboard/admin"
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  pathname === "/dashboard/admin"
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Administración
              </Link>
            )}
            <div className="px-3 py-2">
              <ThemeToggle />
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pb-3 pt-4">
            {session ? (
              <div className="space-y-1 px-2">
                <Link
                  href="/dashboard/perfil"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Perfil</span>
                  </div>
                </Link>
                <button
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="h-5 w-5" />
                    <span>Cerrar sesión</span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-1 px-2">
                <Link
                  href="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 