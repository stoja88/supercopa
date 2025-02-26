"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  Calendar, 
  MessageSquare, 
  FileText, 
  DollarSign, 
  Scale, 
  Bell, 
  Users, 
  BarChart,
  TrendingUp,
  CheckCircle,
  Clock,
  CreditCard,
  Loader2
} from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";

// Datos de ejemplo para la demostración
const mockData = {
  upcomingEvents: [
    { id: "1", title: "Reunión escolar", date: new Date(Date.now() + 86400000 * 2), type: "SCHOOL" },
    { id: "2", title: "Cita médica", date: new Date(Date.now() + 86400000 * 5), type: "MEDICAL" },
    { id: "3", title: "Actividad deportiva", date: new Date(Date.now() + 86400000 * 7), type: "ACTIVITY" },
  ],
  recentMessages: [
    { id: "1", content: "¿Puedes recoger a los niños mañana?", sender: "Ana", date: new Date(Date.now() - 3600000 * 2), read: false },
    { id: "2", content: "Te envié los documentos del colegio", sender: "Carlos", date: new Date(Date.now() - 3600000 * 12), read: true },
    { id: "3", content: "Necesitamos hablar sobre las vacaciones", sender: "Ana", date: new Date(Date.now() - 3600000 * 24), read: true },
  ],
  recentExpenses: [
    { id: "1", title: "Material escolar", amount: 45.50, date: new Date(Date.now() - 86400000 * 1), category: "EDUCATION", status: "PENDING" },
    { id: "2", title: "Dentista", amount: 120, date: new Date(Date.now() - 86400000 * 3), category: "HEALTH", status: "APPROVED" },
    { id: "3", title: "Ropa deportiva", amount: 85.75, date: new Date(Date.now() - 86400000 * 5), category: "CLOTHING", status: "APPROVED" },
  ],
  recentDocuments: [
    { id: "1", title: "Informe escolar", date: new Date(Date.now() - 86400000 * 2), category: "EDUCATIONAL" },
    { id: "2", title: "Receta médica", date: new Date(Date.now() - 86400000 * 4), category: "MEDICAL" },
    { id: "3", title: "Acuerdo de custodia", date: new Date(Date.now() - 86400000 * 10), category: "LEGAL" },
  ],
  totalExpenses: 1250.75,
  pendingTasks: 3,
  unreadMessages: 2,
  subscription: {
    plan: "Básico",
    nextPayment: new Date(Date.now() + 86400000 * 15),
    features: ["Calendario básico", "Mensajería", "Documentos (5GB)"],
    progress: 65,
  },
  tasks: [
    { id: "1", title: "Actualizar información de contacto", completed: true },
    { id: "2", title: "Revisar gastos pendientes", completed: false },
    { id: "3", title: "Completar calendario mensual", completed: false },
    { id: "4", title: "Subir documentos escolares", completed: false },
  ]
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [greeting, setGreeting] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);

  // Establecer el saludo según la hora del día
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Buenos días");
    } else if (hour < 20) {
      setGreeting("Buenas tardes");
    } else {
      setGreeting("Buenas noches");
    }
  }, []);

  // Cargar datos de suscripción
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        setIsLoadingSubscription(true);
        const response = await fetch('/api/subscription');
        
        if (!response.ok) {
          throw new Error('Error al cargar los datos de suscripción');
        }
        
        const data = await response.json();
        setSubscription(data.subscription);
        setHasActiveSubscription(data.hasActiveSubscription);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los datos de suscripción.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingSubscription(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {greeting}, {session?.user?.name?.split(" ")[0] || "Usuario"}
        </h1>
        <p className="text-muted-foreground">
          Bienvenido a tu panel de co-parentalidad. Aquí tienes un resumen de la actividad reciente.
        </p>
      </div>

      {/* Sección de suscripción */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <CreditCard className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" /> 
            {isLoadingSubscription ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Cargando información de suscripción...
              </div>
            ) : hasActiveSubscription ? (
              <>Plan de suscripción: <span className="ml-2 font-bold text-blue-600 dark:text-blue-400">{subscription?.plan?.name || "Plan Activo"}</span></>
            ) : (
              <>Sin suscripción activa</>
            )}
          </CardTitle>
          {!isLoadingSubscription && hasActiveSubscription && (
            <CardDescription>
              Próximo pago: {subscription?.currentPeriodEnd ? formatDate(new Date(subscription.currentPeriodEnd)) : "No disponible"}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {isLoadingSubscription ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : hasActiveSubscription ? (
            <>
              {subscription?.plan?.features && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {subscription.plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-2">
              <p className="mb-4">Actualmente no tienes una suscripción activa. Suscríbete para acceder a todas las funcionalidades.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 border-none">
            <Link href="/dashboard/subscription">
              {hasActiveSubscription ? "Gestionar suscripción" : "Ver planes disponibles"}
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Resumen de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gastos totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">{formatCurrency(mockData.totalExpenses)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" /> 
              12% más que el mes pasado
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Próximos eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-2xl font-bold">{mockData.upcomingEvents.length}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <Clock className="inline h-3 w-3 mr-1" /> 
              Próximo: {mockData.upcomingEvents[0].title}
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mensajes sin leer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-2xl font-bold">{mockData.unreadMessages}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <Clock className="inline h-3 w-3 mr-1" /> 
              Último: hace {Math.round((Date.now() - mockData.recentMessages[0].date.getTime()) / 3600000)} horas
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tareas pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-2xl font-bold">{mockData.pendingTasks}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <CheckCircle className="inline h-3 w-3 text-green-500 mr-1" /> 
              {mockData.tasks.filter(t => t.completed).length} tareas completadas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tareas pendientes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" /> Tareas pendientes
          </CardTitle>
          <CardDescription>
            Actividades que requieren tu atención
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${task.completed ? "bg-green-100 border-green-500 text-green-500" : "border-gray-300"}`}>
                    {task.completed && <CheckCircle className="h-3 w-3" />}
                  </div>
                  <span className={task.completed ? "line-through text-muted-foreground" : ""}>{task.title}</span>
                </div>
                {!task.completed && (
                  <Button variant="ghost" size="sm">Completar</Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/tareas">
              Ver todas las tareas
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Secciones principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Próximos eventos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" /> Próximos eventos
            </CardTitle>
            <CardDescription>
              Eventos programados para los próximos días
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockData.upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {mockData.upcomingEvents.map((event) => (
                  <div key={event.id} className="flex justify-between items-start border-b pb-3">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(event.date)}
                      </p>
                    </div>
                    <Badge variant="outline" className={
                      event.type === "SCHOOL" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                      event.type === "MEDICAL" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" :
                      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    }>
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No hay eventos próximos
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/calendario">
                Ver calendario completo
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Mensajes recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" /> Mensajes recientes
            </CardTitle>
            <CardDescription>
              Últimas comunicaciones con tu co-padre/madre
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockData.recentMessages.length > 0 ? (
              <div className="space-y-4">
                {mockData.recentMessages.map((message) => (
                  <div key={message.id} className="flex justify-between items-start border-b pb-3">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <p className="font-medium">{message.sender}</p>
                        {!message.read && (
                          <Badge className="ml-2 bg-blue-500 text-white">Nuevo</Badge>
                        )}
                      </div>
                      <p className="text-sm line-clamp-1">{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(message.date)}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-2">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No hay mensajes recientes
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/mensajes">
                Ver todos los mensajes
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gastos recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" /> Gastos recientes
            </CardTitle>
            <CardDescription>
              Últimos gastos compartidos registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockData.recentExpenses.length > 0 ? (
              <div className="space-y-4">
                {mockData.recentExpenses.map((expense) => (
                  <div key={expense.id} className="flex justify-between items-start border-b pb-3">
                    <div>
                      <p className="font-medium">{expense.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{formatDate(expense.date)}</span>
                        <span className="mx-1">•</span>
                        <Badge variant="outline" className={
                          expense.category === "EDUCATION" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                          expense.category === "HEALTH" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" :
                          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        }>
                          {expense.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">
                        {formatCurrency(expense.amount)}
                      </div>
                      <Badge variant={expense.status === "APPROVED" ? "outline" : "secondary"} className={
                        expense.status === "APPROVED" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : 
                        "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                      }>
                        {expense.status === "APPROVED" ? "Aprobado" : "Pendiente"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No hay gastos recientes
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/gastos">
                Gestionar gastos
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Documentos recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" /> Documentos recientes
            </CardTitle>
            <CardDescription>
              Últimos documentos compartidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockData.recentDocuments.length > 0 ? (
              <div className="space-y-4">
                {mockData.recentDocuments.map((doc) => (
                  <div key={doc.id} className="flex justify-between items-start border-b pb-3">
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{formatDate(doc.date)}</span>
                        <span className="mx-1">•</span>
                        <Badge variant="outline" className={
                          doc.category === "EDUCATIONAL" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                          doc.category === "MEDICAL" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" :
                          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                        }>
                          {doc.category}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No hay documentos recientes
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/documentos">
                Ver todos los documentos
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 