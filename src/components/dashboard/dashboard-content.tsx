"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertCircle, MessageSquare, Calendar, DollarSign, FileText, ChevronRight, Search, Filter, Plus, Settings, User, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Importar los nuevos componentes
import { StatsCard } from "@/components/dashboard/stats-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { CalendarPreview } from "@/components/dashboard/calendar-preview";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { SubscriptionCard } from "@/components/dashboard/subscription-card";
import { FamilyProgress } from "@/components/dashboard/family-progress";
import { FamilyMembers } from "@/components/dashboard/family-members";
import { TasksList } from "@/components/dashboard/tasks-list";
import { RecentMessages } from "@/components/dashboard/recent-messages";
import { RecentDocuments } from "@/components/dashboard/recent-documents";
import { RecentExpenses } from "@/components/dashboard/recent-expenses";

// Datos de ejemplo
const mockData = {
  upcomingEvents: [
    {
      id: "1",
      title: "Reunión escolar",
      date: new Date(Date.now() + 86400000 * 2), // 2 días después
      type: "SCHOOL",
      description: "Reunión con el tutor para hablar del progreso académico",
    },
    {
      id: "2",
      title: "Cita médica - Pediatra",
      date: new Date(Date.now() + 86400000 * 3), // 3 días después
      type: "MEDICAL",
      description: "Revisión anual con el Dr. Martínez",
    },
    {
      id: "3",
      title: "Clase de natación",
      date: new Date(Date.now() + 86400000 * 5), // 5 días después
      type: "ACTIVITY",
      description: "Llevar bañador y toalla",
    },
    {
      id: "4",
      title: "Cumpleaños de Lucía",
      date: new Date(Date.now() + 86400000 * 7), // 7 días después
      type: "FAMILY",
      description: "Comprar regalo y preparar la fiesta",
    },
  ],
  recentMessages: [
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
  ],
  recentExpenses: [
    {
      id: "1",
      title: "Material escolar",
      description: "€35.50 - Pagado por Carlos",
      timestamp: new Date(Date.now() - 259200000), // 3 días atrás
      icon: "receipt",
      status: "pending",
    },
    {
      id: "2",
      title: "Clases de natación",
      description: "€60.00 - Pagado por Ana",
      timestamp: new Date(Date.now() - 604800000), // 7 días atrás
      icon: "receipt",
      status: "approved",
    },
  ],
  recentDocuments: [
    {
      id: "1",
      title: "Informe escolar - Primer trimestre",
      description: "PDF - Subido por Ana",
      timestamp: new Date(Date.now() - 172800000), // 2 días atrás
      icon: "file",
      status: "new",
    },
    {
      id: "2",
      title: "Calendario vacunas",
      description: "PDF - Subido por Carlos",
      timestamp: new Date(Date.now() - 432000000), // 5 días atrás
      icon: "file",
      status: "viewed",
    },
  ],
  tasks: [
    {
      id: "1",
      title: "Pagar matrícula escolar",
      description: "Vence en 3 días",
      timestamp: new Date(Date.now() + 86400000 * 3), // 3 días después
      icon: "task",
      status: "high",
    },
    {
      id: "2",
      title: "Programar revisión médica anual",
      description: "Vence en 7 días",
      timestamp: new Date(Date.now() + 86400000 * 7), // 7 días después
      icon: "task",
      status: "medium",
    },
  ],
  expenseData: [
    {
      month: "Enero",
      education: 250,
      health: 120,
      clothing: 80,
      activities: 150,
      other: 50,
    },
    {
      month: "Febrero",
      education: 220,
      health: 150,
      clothing: 60,
      activities: 180,
      other: 40,
    },
  ],
};

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function DashboardContent() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [greeting, setGreeting] = useState("Hola");
  const [subscription, setSubscription] = useState(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("general");
  const [dashboardLayout, setDashboardLayout] = useState("grid");

  // Establecer el saludo según la hora del día
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Buenos días");
    } else if (hour >= 12 && hour < 20) {
      setGreeting("Buenas tardes");
    } else {
      setGreeting("Buenas noches");
    }
  }, []);

  // Obtener información de la suscripción
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        setIsLoadingSubscription(true);
        const response = await fetch("/api/subscription");
        
        if (!response.ok) {
          if (response.status === 404) {
            setStripeEnabled(false);
          }
          throw new Error("Error al obtener la suscripción");
        }
        
        const data = await response.json();
        setSubscription(data);
        setHasActiveSubscription(data.status === "active");
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "No se pudo obtener la información de la suscripción.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingSubscription(false);
      }
    };

    fetchSubscription();
  }, [toast]);

  // Manejar la gestión de la suscripción
  const handleManageSubscription = async () => {
    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
      });
      
      if (!response.ok) {
        throw new Error('Error al gestionar la suscripción');
      }
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'No se pudo gestionar la suscripción.',
        variant: 'destructive',
      });
    }
  };

  // Manejar la actualización de plan
  const handleUpgrade = () => {
    window.location.href = '/dashboard/subscription';
  };

  // Obtener el nombre del usuario de forma segura
  const getUserFirstName = () => {
    if (session?.user?.name) {
      return session.user.name.split(" ")[0];
    }
    return "Usuario";
  };

  return (
    <motion.div 
      className="container-custom py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {greeting}, {getUserFirstName()}
            </h1>
            <p className="text-muted-foreground">
              Bienvenido a tu panel de co-parentalidad. Aquí tienes un resumen de la actividad reciente.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notificaciones</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setDashboardLayout(dashboardLayout === "grid" ? "list" : "grid")}>
                  Cambiar vista
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.location.href = '/dashboard/settings'}>
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.location.href = '/dashboard/profile'}>
                  Perfil
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>

      <motion.div className="mb-6" variants={itemVariants}>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
            <TabsTrigger value="familia" className="flex-1">Familia</TabsTrigger>
            <TabsTrigger value="finanzas" className="flex-1">Finanzas</TabsTrigger>
            <TabsTrigger value="documentos" className="flex-1">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-0">
            {/* Sección de estadísticas */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
              variants={itemVariants}
            >
              <StatsCard
                title="Mensajes sin leer"
                value="2"
                description="Tienes 2 mensajes sin leer"
                icon={<MessageSquare className="h-5 w-5" />}
                trend={{ value: 10, isPositive: false }}
                onClick={() => window.location.href = '/dashboard/mensajes'}
              />
              <StatsCard
                title="Eventos próximos"
                value="4"
                description="En los próximos 7 días"
                icon={<Calendar className="h-5 w-5" />}
                trend={{ value: 5, isPositive: true }}
                onClick={() => window.location.href = '/dashboard/calendario'}
              />
              <StatsCard
                title="Gastos pendientes"
                value="€35.50"
                description="1 gasto por aprobar"
                icon={<DollarSign className="h-5 w-5" />}
                trend={{ value: 12, isPositive: false }}
                onClick={() => window.location.href = '/dashboard/gastos'}
              />
              <StatsCard
                title="Documentos nuevos"
                value="1"
                description="Subido hace 2 días"
                icon={<FileText className="h-5 w-5" />}
                trend={{ value: 0, isPositive: true }}
                onClick={() => window.location.href = '/dashboard/documentos'}
              />
            </motion.div>

            {/* Sección principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Columna izquierda */}
              <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
                {/* Calendario y eventos */}
                <motion.div variants={itemVariants}>
                  <CalendarPreview events={mockData.upcomingEvents} className="h-full" />
                </motion.div>
                
                {/* Mensajes recientes */}
                <motion.div variants={itemVariants}>
                  <RecentMessages />
                </motion.div>
              </motion.div>

              {/* Columna derecha */}
              <motion.div className="space-y-6" variants={itemVariants}>
                {/* Suscripción */}
                <motion.div variants={itemVariants}>
                  <SubscriptionCard
                    isLoading={isLoadingSubscription}
                    subscription={subscription}
                    hasActiveSubscription={hasActiveSubscription}
                    onManageSubscription={handleManageSubscription}
                    onUpgrade={handleUpgrade}
                    stripeEnabled={stripeEnabled}
                  />
                </motion.div>
                
                {/* Tareas pendientes */}
                <motion.div variants={itemVariants}>
                  <TasksList tasks={mockData.tasks} />
                </motion.div>
                
                {/* Actividad reciente */}
                <motion.div variants={itemVariants}>
                  <ActivityCard />
                </motion.div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="familia" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <motion.div variants={itemVariants}>
                  <FamilyMembers />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FamilyProgress />
                </motion.div>
              </div>
              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                  <CalendarPreview events={mockData.upcomingEvents.filter(e => e.type === "FAMILY")} className="h-full" maxEvents={3} />
                </motion.div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="finanzas" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <motion.div variants={itemVariants}>
                  <ExpenseChart data={mockData.expenseData} className="h-full" />
                </motion.div>
              </div>
              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                  <RecentExpenses expenses={mockData.recentExpenses} />
                </motion.div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documentos" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <motion.div variants={itemVariants}>
                  <RecentDocuments documents={mockData.recentDocuments} />
                </motion.div>
              </div>
              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Subir documento</CardTitle>
                      <CardDescription>Comparte documentos importantes con el otro progenitor</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Subir nuevo documento
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
} 