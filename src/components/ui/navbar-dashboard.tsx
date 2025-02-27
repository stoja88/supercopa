"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, MessageCircle, Bookmark, Folder } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function NavbarDashboard({ className, casoId }: { className?: string, casoId?: string }) {
  const pathname = usePathname()
  
  const navItems: NavItem[] = [
    {
      title: "Detalles del Caso",
      href: `/mediacion/caso/${casoId}`,
      icon: <Folder className="w-5 h-5" />,
    },
    {
      title: "Sesiones",
      href: `/mediacion/caso/${casoId}/sesiones`,
      icon: <Bookmark className="w-5 h-5" />,
    },
    {
      title: "Documentos",
      href: `/mediacion/caso/${casoId}/documentos`,
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "Mensajes",
      href: `/mediacion/caso/${casoId}/mensajes`,
      icon: <MessageCircle className="w-5 h-5" />,
    },
  ]

  if (!casoId) return null

  return (
    <nav className={cn("flex px-4 py-2 border-b bg-background sticky top-0 z-10", className)}>
      <TooltipProvider>
        <div className="flex items-center space-x-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center space-x-2",
                      isActive && "font-medium"
                    )}
                  >
                    <Link href={item.href}>
                      <span className="flex items-center space-x-2">
                        {item.icon}
                        <span>{item.title}</span>
                      </span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{item.title}</TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </nav>
  )
} 