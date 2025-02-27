"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarDashboard } from "@/components/ui/navbar-dashboard";
import { 
  Users, FileText, Calendar, MessageSquare, BarChart, Settings, 
  MoreHorizontal, Search, Filter, Plus, ArrowUpRight, Bell, User
} from "lucide-react";
import { AreaChart, BarList } from "@tremor/react";

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

// Datos de ejemplo para el dashboard
const chartdata = [
  {
    date: "Ene",
    "Casos activos": 10,
    "Casos resueltos": 5,
  },
  {
    date: "Feb",
    "Casos activos": 12,
    "Casos resueltos": 8,
  },
  {
    date: "Mar",
    "Casos activos": 15,
    "Casos resueltos": 10,
  },
  {
    date: "Abr",
    "Casos activos": 20,
    "Casos resueltos": 12,
  },
  {
    date: "May",
    "Casos activos": 18,
    "Casos resueltos": 14,
  },
  {
    date: "Jun",
    "Casos activos": 22,
    "Casos resueltos": 16,
  },
];

const casosPendientes = [
  {
    name: "Documentación pendiente",
    value: 12,
  },
  {
    name: "Esperando respuesta",
    value: 8,
  },
  {
    name: "Próxima sesión",
    value: 7,
  },
  {
    name: "Acuerdo en borrador",
    value: 4,
  },
  {
    name: "Revisión legal",
    value: 2,
  },
];

const casosRecientes = [
  {
    id: "CASO-2023-001",
    partes: "García / Martínez",
    tipo: "Divorcio",
    estado: "En proceso",
    fechaInicio: "15/06/2023",
    proximaAccion: "Sesión",
    fechaAccion: "24/07/2023"
  },
  {
    id: "CASO-2023-002",
    partes: "López / Sánchez",
    tipo: "Custodia",
    estado: "Documentación",
    fechaInicio: "22/05/2023",
    proximaAccion: "Revisión",
    fechaAccion: "18/07/2023"
  },
  {
    id: "CASO-2023-003",
    partes: "Fernández / Gómez",
    tipo: "Pensión",
    estado: "Acuerdo",
    fechaInicio: "10/04/2023",
    proximaAccion: "Firma",
    fechaAccion: "20/07/2023"
  },
  {
    id: "CASO-2023-004",
    partes: "Rodríguez / Pérez",
    tipo: "Régimen visitas",
    estado: "En proceso",
    fechaInicio: "05/06/2023",
    proximaAccion: "Sesión",
    fechaAccion: "19/07/2023"
  },
  {
    id: "CASO-2023-005",
    partes: "Díaz / Muñoz",
    tipo: "Divorcio",
    estado: "Suspendido",
    fechaInicio: "20/03/2023",
    proximaAccion: "Contacto",
    fechaAccion: "31/07/2023"
  }
];

const proximasActividades = [
  {
    tipo: "Sesión",
    caso: "CASO-2023-001",
    partes: "García / Martínez",
    fecha: "24/07/2023",
    hora: "10:00",
    lugar: "Online"
  },
  {
    tipo: "Revisión",
    caso: "CASO-2023-002",
    partes: "López / Sánchez",
    fecha: "18/07/2023",
    hora: "12:30",
    lugar: "Oficina"
  },
  {
    tipo: "Firma",
    caso: "CASO-2023-003",
    partes: "Fernández / Gómez",
    fecha: "20/07/2023",
    hora: "16:00",
    lugar: "Notaría"
  }
];

const notificaciones = [
  {
    id: 1,
    mensaje: "Nuevo documento subido en el caso CASO-2023-002",
    tiempo: "Hace 2 horas",
    leida: false
  },
  {
    id: 2,
    mensaje: "Recordatorio: Sesión mañana con García / Martínez",
    tiempo: "Hace 5 horas",
    leida: false
  },
  {
    id: 3,
    mensaje: "Fernández ha aceptado el acuerdo propuesto",
    tiempo: "Hace 1 día",
    leida: true
  },
  {
    id: 4,
    mensaje: "Actualización del calendario de visitas en CASO-2023-004",
    tiempo: "Hace 2 días",
    leida: true
  }
];

export default function DashboardMediadores() {
  const [activeTab, setActiveTab] = useState("resumen");
  const [notificacionesNoLeidas, setNotificacionesNoLeidas] = useState(
    notificaciones.filter(n => !n.leida).length
  );

  const marcarLeida = (id: number) => {
    const nuevasNotificaciones = notificaciones.map(n => 
      n.id === id ? { ...n, leida: true } : n
    );
    setNotificacionesNoLeidas(nuevasNotificaciones.filter(n => !n.leida).length);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavbarDashboard 
        notificaciones={notificacionesNoLeidas}
        rol="mediador"
      />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold">Dashboard de Mediación</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Gestiona tus casos de mediación familiar de forma eficiente
            </p>
          </motion.div>
          
          <motion.div className="flex space-x-2 mt-4 md:mt-0" variants={itemVariants}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                  {notificacionesNoLeidas > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificacionesNoLeidas}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notificaciones.map((notificacion) => (
                  <DropdownMenuItem 
                    key={notificacion.id} 
                    className={`flex flex-col items-start p-3 ${notificacion.leida ? 'opacity-70' : 'font-medium'}`}
                    onClick={() => marcarLeida(notificacion.id)}
                  >
                    <div className="flex justify-between w-full">
                      <span>{notificacion.mensaje}</span>
                      {!notificacion.leida && (
                        <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{notificacion.tiempo}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo caso
            </Button>
          </motion.div>
        </motion.div>
        
        <Tabs 
          defaultValue="resumen" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 md:grid-cols-5 h-auto md:h-10">
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="casos">Casos</TabsTrigger>
            <TabsTrigger value="calendario">Calendario</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
            <TabsTrigger value="ajustes" className="hidden md:inline-flex">Ajustes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resumen" className="mt-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Casos Activos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">22</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +4 desde el mes pasado
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Casos Resueltos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">16</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +2 desde el mes pasado
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Actividades Pendientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      3 esta semana
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Progreso de Casos</CardTitle>
                    <CardDescription>
                      Evolución mensual de casos activos y resueltos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AreaChart
                      className="h-72"
                      data={chartdata}
                      index="date"
                      categories={["Casos activos", "Casos resueltos"]}
                      colors={["blue", "green"]}
                      valueFormatter={(number) => `${number} casos`}
                      showAnimation={true}
                      showLegend={true}
                    />
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Estado de Casos Pendientes</CardTitle>
                    <CardDescription>
                      Distribución de tareas por completar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarList
                      data={casosPendientes}
                      className="h-72"
                      valueFormatter={(number) => `${number} casos`}
                      color="blue"
                      showAnimation={true}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Próximas Actividades</CardTitle>
                      <CardDescription>
                        Sesiones y eventos programados
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver todo
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {proximasActividades.map((actividad, i) => (
                        <div key={i} className="flex items-center">
                          <div className={`
                            flex items-center justify-center w-10 h-10 rounded-full 
                            ${actividad.tipo === 'Sesión' ? 'bg-blue-100 text-blue-600' : 
                              actividad.tipo === 'Revisión' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}
                          `}>
                            {actividad.tipo === 'Sesión' ? (
                              <Users className="h-5 w-5" />
                            ) : actividad.tipo === 'Revisión' ? (
                              <FileText className="h-5 w-5" />
                            ) : (
                              <FileText className="h-5 w-5" />
                            )}
                          </div>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium">{actividad.tipo}: {actividad.partes}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {actividad.fecha}, {actividad.hora} - {actividad.lugar}
                            </p>
                          </div>
                          <div className="ml-auto">
                            <Badge variant="outline">{actividad.caso}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="casos" className="mt-6">
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                variants={itemVariants}
              >
                <div className="flex items-center w-full sm:w-auto">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Buscar casos..."
                      className="pl-8 w-full"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los estados</SelectItem>
                      <SelectItem value="proceso">En proceso</SelectItem>
                      <SelectItem value="documentacion">Documentación</SelectItem>
                      <SelectItem value="acuerdo">Acuerdo</SelectItem>
                      <SelectItem value="suspendido">Suspendido</SelectItem>
                      <SelectItem value="finalizado">Finalizado</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo caso
                  </Button>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Partes</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Inicio</TableHead>
                          <TableHead>Próxima acción</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {casosRecientes.map((caso, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{caso.id}</TableCell>
                            <TableCell>{caso.partes}</TableCell>
                            <TableCell>{caso.tipo}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={`
                                  ${caso.estado === 'En proceso' ? 'border-blue-200 bg-blue-50 text-blue-600' : 
                                    caso.estado === 'Documentación' ? 'border-amber-200 bg-amber-50 text-amber-600' : 
                                    caso.estado === 'Acuerdo' ? 'border-green-200 bg-green-50 text-green-600' : 
                                    caso.estado === 'Suspendido' ? 'border-red-200 bg-red-50 text-red-600' : ''}
                                `}
                              >
                                {caso.estado}
                              </Badge>
                            </TableCell>
                            <TableCell>{caso.fechaInicio}</TableCell>
                            <TableCell>{caso.proximaAccion}</TableCell>
                            <TableCell>{caso.fechaAccion}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                                  <DropdownMenuItem>Editar caso</DropdownMenuItem>
                                  <DropdownMenuItem>Agregar sesión</DropdownMenuItem>
                                  <DropdownMenuItem>Compartir documentos</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Cerrar caso</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Mostrando 5 de 22 casos
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        Anterior
                      </Button>
                      <Button variant="outline" size="sm">
                        Siguiente
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="calendario" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendario de Actividades</CardTitle>
                <CardDescription>
                  Esta funcionalidad está en desarrollo. Pronto podrás ver y gestionar tu calendario de sesiones y actividades de mediación.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-80">
                <div className="text-center">
                  <Calendar className="h-16 w-16 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Calendario de Mediación</h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-md">
                    El calendario de mediación te permitirá programar sesiones, establecer recordatorios y coordinar actividades con todas las partes involucradas.
                  </p>
                  <Button className="mt-4">
                    Explorar vista previa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documentos" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestor de Documentos</CardTitle>
                <CardDescription>
                  Esta funcionalidad está en desarrollo. Pronto podrás gestionar todos los documentos relacionados con tus casos de mediación.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-80">
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Documentos de Mediación</h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-md">
                    El gestor de documentos te permitirá almacenar, compartir y firmar digitalmente todos los documentos necesarios para el proceso de mediación.
                  </p>
                  <Button className="mt-4">
                    Explorar vista previa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ajustes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Perfil</CardTitle>
                <CardDescription>
                  Personaliza tu perfil de mediador y ajusta las preferencias de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-80">
                <div className="text-center">
                  <Settings className="h-16 w-16 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Ajustes de la Plataforma</h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-md">
                    Esta sección te permitirá personalizar tu experiencia en la plataforma, gestionar tu perfil profesional y configurar las notificaciones.
                  </p>
                  <Button className="mt-4">
                    Explorar ajustes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 