"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X, UserPlus, MessageSquare, Calendar, FileText, Settings, LogOut, Moon, Sun, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { InviteParentSection } from "@/components/ui/invite-parent-section";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nuevo mensaje",
      description: "Ana ha enviado un nuevo mensaje sobre el calendario",
      time: "Hace 5 minutos",
      read: false
    },
    {
      id: 2,
      title: "Recordatorio de evento",
      description: "Mañana: Recogida de los niños a las 17:00",
      time: "Hace 2 horas",
      read: false
    },
    {
      id: 3,
      title: "Gasto compartido",
      description: "Carlos ha registrado un nuevo gasto de material escolar",
      time: "Hace 1 día",
      read: true
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Verificar si el otro progenitor está registrado
  const [isOtherParentRegistered, setIsOtherParentRegistered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { icon: <Calendar className="h-5 w-5" />, label: "Calendario", href: "/dashboard" },
    { icon: <MessageSquare className="h-5 w-5" />, label: "Mensajes", href: "/dashboard/mensajes" },
    { icon: <FileText className="h-5 w-5" />, label: "Documentos", href: "/dashboard/documentos" },
    { icon: <Settings className="h-5 w-5" />, label: "Configuración", href: "/dashboard/configuracion" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm fixed top-0 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="mr-2 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CoParent</span>
                <Badge variant="outline" className="hidden md:flex">Dashboard</Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isOtherParentRegistered && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="hidden md:flex items-center gap-2 border-dashed border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          >
                            <UserPlus className="h-4 w-4" />
                            <span>Invitar al otro progenitor</span>
                            <ChevronRight className="h-4 w-4 opacity-50" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0">
                          <InviteParentSection />
                        </DialogContent>
                      </Dialog>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Invita al otro progenitor para aprovechar todas las funcionalidades</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleNotifications}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                      {unreadCount}
                    </span>
                  )}
                </Button>
                
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-medium">Notificaciones</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          Marcar todas como leídas
                        </Button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map(notification => (
                            <div 
                              key={notification.id}
                              className={`p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                                !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                              }`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium text-sm">{notification.title}</h4>
                                {!notification.read && (
                                  <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.description}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            No hay notificaciones
                          </div>
                        )}
                      </div>
                      <div className="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 w-full"
                        >
                          Ver todas las notificaciones
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-gray-700 dark:text-gray-300"
              >
                {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <div className="flex items-center">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="/avatars/user-1.jpg" alt="Usuario" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-30 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside 
        className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-40 md:translate-x-0 pt-16"
        variants={sidebarVariants}
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-lg">Menú</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
          
          {!isOtherParentRegistered && (
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="font-medium text-sm text-blue-800 dark:text-blue-300 mb-2">Invita al otro progenitor</h3>
              <p className="text-xs text-blue-700 dark:text-blue-400 mb-3">
                Para aprovechar todas las funcionalidades, invita al otro progenitor a unirse.
              </p>
              <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invitar ahora
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0">
                  <InviteParentSection />
                </DialogContent>
              </Dialog>
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 right-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </motion.aside>
      
      {/* Main Content */}
      <main className="pt-16 md:pl-64 min-h-screen">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="p-4 md:p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
} 