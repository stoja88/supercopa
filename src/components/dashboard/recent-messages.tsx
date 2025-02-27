"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, PaperclipIcon, Search, Filter, CheckCircle, Bell, X, ChevronRight, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string | null;
  };
  content: string;
  timestamp: Date;
  isRead: boolean;
  hasAttachments: boolean;
  category?: "importante" | "recordatorio" | "general";
}

const messageVariants = {
  initial: { 
    opacity: 0, 
    y: 10,
    scale: 0.98
  },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: custom * 0.05,
      duration: 0.3
    }
  }),
  exit: { 
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  },
  hover: {
    scale: 1.01,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.2 }
  }
};

export function RecentMessages() {
  const [activeTab, setActiveTab] = useState<"todos" | "no-leidos" | "importantes">("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Message["category"] | "todos">("todos");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  // En una implementación real, estos datos vendrían de la API
  const messages: Message[] = [
    {
      id: "1",
      sender: {
        id: "2",
        name: "Carlos Rodríguez",
        avatar: null,
      },
      content: "He programado la cita con el dentista para el próximo martes a las 16:00. ¿Puedes llevar a los niños?",
      timestamp: new Date(Date.now() - 1800000), // 30 minutos atrás
      isRead: false,
      hasAttachments: false,
      category: "importante",
    },
    {
      id: "2",
      sender: {
        id: "3",
        name: "María López",
        avatar: null,
      },
      content: "Adjunto las fotos del cumpleaños de Lucía. Fue un día maravilloso.",
      timestamp: new Date(Date.now() - 86400000), // 1 día atrás
      isRead: true,
      hasAttachments: true,
    },
    {
      id: "3",
      sender: {
        id: "2",
        name: "Carlos Rodríguez",
        avatar: null,
      },
      content: "Recordatorio: mañana hay reunión de padres en el colegio a las 18:00.",
      timestamp: new Date(Date.now() - 172800000), // 2 días atrás
      isRead: true,
      hasAttachments: false,
      category: "recordatorio",
    },
  ];

  // Filtrar mensajes según la pestaña activa, búsqueda y categoría
  const filteredMessages = messages.filter(message => {
    // Filtro por pestaña
    if (activeTab === "no-leidos" && message.isRead) return false;
    if (activeTab === "importantes" && message.category !== "importante") return false;
    
    // Filtro por categoría
    if (selectedCategory !== "todos" && message.category !== selectedCategory) return false;
    
    // Filtro por búsqueda
    if (searchQuery && !message.content.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !message.sender.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Marcar mensaje como leído
  const markAsRead = (id: string) => {
    // En una implementación real, esto sería una llamada a la API
    console.log(`Marcando mensaje ${id} como leído`);
  };

  // Función para formatear la fecha del mensaje
  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 1) return "Ahora mismo";
    if (diffMins < 60) return `Hace ${diffMins} minutos`;
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Función para obtener el color de la categoría
  const getCategoryBadge = (category?: Message["category"]) => {
    if (!category) return "";
    
    switch (category) {
      case "importante":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "recordatorio":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "general":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Función para traducir la categoría
  const getCategoryName = (category?: Message["category"] | "todos") => {
    if (!category) return "";
    
    switch (category) {
      case "importante":
        return "Importante";
      case "recordatorio":
        return "Recordatorio";
      case "general":
        return "General";
      case "todos":
        return "Todos";
    }
  };

  // Función para enviar un nuevo mensaje
  const sendMessage = () => {
    if (newMessage.trim() && recipient.trim()) {
      // En una implementación real, esto sería una llamada a la API
      console.log(`Enviando mensaje a ${recipient}: ${newMessage}`);
      setIsComposeOpen(false);
      setNewMessage("");
      setRecipient("");
    }
  };

  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Mensajes recientes</CardTitle>
            <CardDescription>
              {messages.filter(m => !m.isRead).length} mensajes sin leer
            </CardDescription>
          </div>
          <div className="flex space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Buscar mensajes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedCategory("todos")}>
                        Todos los mensajes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedCategory("importante")}>
                        Importantes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedCategory("recordatorio")}>
                        Recordatorios
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedCategory("general")}>
                        Generales
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filtrar por categoría</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="default" className="h-8 bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Nuevo mensaje
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Nuevo mensaje</DialogTitle>
                  <DialogDescription>
                    Envía un mensaje a otro padre o mediador
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="recipient" className="text-sm font-medium">
                      Destinatario
                    </label>
                    <Input
                      id="recipient"
                      placeholder="Nombre del destinatario"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={sendMessage} 
                    disabled={!newMessage.trim() || !recipient.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar mensaje
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 overflow-hidden"
            >
              <Input
                placeholder="Buscar mensajes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 text-sm"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {selectedCategory !== "todos" && (
          <div className="flex items-center mt-2">
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 px-2 py-1"
              style={{ 
                backgroundColor: selectedCategory === "importante" ? "rgba(239, 68, 68, 0.1)" : 
                                selectedCategory === "recordatorio" ? "rgba(59, 130, 246, 0.1)" : 
                                "rgba(107, 114, 128, 0.1)",
                color: selectedCategory === "importante" ? "rgb(239, 68, 68)" : 
                      selectedCategory === "recordatorio" ? "rgb(59, 130, 246)" : 
                      "rgb(107, 114, 128)"
              }}
            >
              {getCategoryName(selectedCategory)}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => setSelectedCategory("todos")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="mt-2">
          <TabsList className="w-full">
            <TabsTrigger value="todos" className="flex-1">
              Todos
            </TabsTrigger>
            <TabsTrigger value="no-leidos" className="flex-1">
              No leídos
              {messages.filter(m => !m.isRead).length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                  {messages.filter(m => !m.isRead).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="importantes" className="flex-1">
              Importantes
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow overflow-y-auto">
        <AnimatePresence mode="wait">
          {filteredMessages.length === 0 ? (
            <motion.div 
              key="no-messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 text-center h-full"
            >
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedCategory !== "todos" || activeTab !== "todos"
                  ? "No se encontraron mensajes con los filtros actuales" 
                  : "No hay mensajes recientes"}
              </p>
              {(searchQuery || selectedCategory !== "todos" || activeTab !== "todos") && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory("todos");
                    setActiveTab("todos");
                  }}
                >
                  Limpiar filtros
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {filteredMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    custom={index}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover="hover"
                    layout
                    className={`p-3 rounded-lg transition-colors ${
                      message.isRead ? "hover:bg-muted/50" : "bg-muted/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0 bg-primary text-primary-foreground">
                        <span>{getInitials(message.sender.name)}</span>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{message.sender.name}</p>
                            {!message.isRead && (
                              <motion.span 
                                className="w-2 h-2 rounded-full bg-primary"
                                initial={{ scale: 0.5, opacity: 0.5 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ 
                                  repeat: Infinity, 
                                  repeatType: "reverse", 
                                  duration: 1 
                                }}
                              />
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatMessageTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm mt-1 line-clamp-2">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            {message.hasAttachments && (
                              <div className="flex items-center text-xs text-muted-foreground">
                                <PaperclipIcon className="h-3 w-3 mr-1" />
                                <span>Adjuntos</span>
                              </div>
                            )}
                            {message.category && (
                              <Badge
                                variant="outline"
                                className={getCategoryBadge(message.category)}
                              >
                                {getCategoryName(message.category)}
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {!message.isRead && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-6 w-6" 
                                      onClick={() => markAsRead(message.id)}
                                    >
                                      <CheckCircle className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Marcar como leído</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </CardContent>
      
      <CardFooter className="border-t pt-4 mt-auto">
        <Button variant="link" className="ml-auto text-xs" asChild>
          <a href="/dashboard/mensajes">Ver todos los mensajes</a>
        </Button>
      </CardFooter>
    </Card>
  );
} 