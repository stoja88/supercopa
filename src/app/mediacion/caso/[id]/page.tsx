"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
  MoreHorizontal, Clock, CheckCircle, XCircle, PlusCircle, 
  Download, ArrowLeft, Send, Paperclip, Eye, Edit, Trash, Share2,
  Phone, Video, Mail
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

// Datos de ejemplo para detalles del caso
const estadosProceso = [
  { id: 1, nombre: "Solicitud inicial", completado: true, fecha: "15/06/2023" },
  { id: 2, nombre: "Sesión informativa", completado: true, fecha: "22/06/2023" },
  { id: 3, nombre: "Recopilación de documentos", completado: true, fecha: "05/07/2023" },
  { id: 4, nombre: "Sesión conjunta 1", completado: true, fecha: "12/07/2023" },
  { id: 5, nombre: "Sesión conjunta 2", completado: false, fecha: "24/07/2023" },
  { id: 6, nombre: "Borrador de acuerdo", completado: false, fecha: "" },
  { id: 7, nombre: "Revisión legal", completado: false, fecha: "" },
  { id: 8, nombre: "Firma de acuerdo", completado: false, fecha: "" },
];

const historialSesiones = [
  { 
    id: 1, 
    fecha: "22/06/2023", 
    hora: "10:00", 
    duracion: "45 min", 
    tipo: "Informativa", 
    participantes: ["Ana García", "Carlos Martínez", "Mediador"],
    notas: "Se explicó el proceso de mediación y las normas básicas. Ambas partes mostraron disposición a colaborar."
  },
  { 
    id: 2, 
    fecha: "12/07/2023", 
    hora: "10:30", 
    duracion: "90 min", 
    tipo: "Conjunta", 
    participantes: ["Ana García", "Carlos Martínez", "Mediador"],
    notas: "Se identificaron los principales temas a tratar: custodia, régimen de visitas y pensión alimenticia. Se estableció una base para la comunicación constructiva."
  }
];

const proximasSesiones = [
  { 
    id: 3, 
    fecha: "24/07/2023", 
    hora: "10:00", 
    duracion: "90 min", 
    tipo: "Conjunta", 
    participantes: ["Ana García", "Carlos Martínez", "Mediador"],
    ubicacion: "Online (Zoom)",
    estado: "Confirmada"
  }
];

const documentos = [
  { 
    id: 1, 
    nombre: "Solicitud de mediación", 
    tipo: "PDF", 
    tamaño: "340 KB", 
    fechaSubida: "15/06/2023",
    subidoPor: "Ana García",
    estado: "Firmado"
  },
  { 
    id: 2, 
    nombre: "Convenio regulador anterior", 
    tipo: "PDF", 
    tamaño: "1.2 MB", 
    fechaSubida: "18/06/2023",
    subidoPor: "Carlos Martínez",
    estado: "Compartido"
  },
  { 
    id: 3, 
    nombre: "Justificantes de ingresos", 
    tipo: "ZIP", 
    tamaño: "2.4 MB", 
    fechaSubida: "03/07/2023",
    subidoPor: "Carlos Martínez",
    estado: "Compartido"
  },
  { 
    id: 4, 
    nombre: "Certificado escolar de los niños", 
    tipo: "PDF", 
    tamaño: "890 KB", 
    fechaSubida: "05/07/2023",
    subidoPor: "Ana García",
    estado: "Compartido"
  },
  { 
    id: 5, 
    nombre: "Acta primera sesión", 
    tipo: "PDF", 
    tamaño: "450 KB", 
    fechaSubida: "22/06/2023",
    subidoPor: "Mediador",
    estado: "Firmado"
  },
  { 
    id: 6, 
    nombre: "Acta segunda sesión", 
    tipo: "PDF", 
    tamaño: "520 KB", 
    fechaSubida: "12/07/2023",
    subidoPor: "Mediador",
    estado: "Pendiente firma"
  }
];

const mensajes = [
  {
    id: 1,
    remitente: "Mediador",
    fecha: "18/06/2023",
    hora: "14:30",
    contenido: "Buenos días a ambos. Tras recibir la solicitud, me gustaría confirmar la primera sesión informativa para el jueves 22 de junio a las 10:00h. ¿Les viene bien a ambos?",
    leido: true
  },
  {
    id: 2,
    remitente: "Ana García",
    fecha: "18/06/2023",
    hora: "15:45",
    contenido: "Por mi parte perfecto. Confirmo asistencia.",
    leido: true
  },
  {
    id: 3,
    remitente: "Carlos Martínez",
    fecha: "18/06/2023",
    hora: "16:20",
    contenido: "Confirmo también. ¿La sesión será presencial u online?",
    leido: true
  },
  {
    id: 4,
    remitente: "Mediador",
    fecha: "18/06/2023",
    hora: "16:35",
    contenido: "Será online vía Zoom. Les enviaré el enlace el mismo día de la sesión. Si tienen alguna duda mientras tanto, no duden en contactarme.",
    leido: true
  },
  {
    id: 5,
    remitente: "Mediador",
    fecha: "20/07/2023",
    hora: "09:15",
    contenido: "Buenos días. Les recuerdo que mañana tenemos nuestra próxima sesión a las 10:00h. Les envío adjunto un resumen de los temas tratados en la sesión anterior y los puntos a abordar mañana para que puedan revisarlos.",
    leido: false
  }
];

const partes = [
  {
    id: 1,
    nombre: "Ana García",
    rol: "Parte solicitante",
    email: "ana.garcia@email.com",
    telefono: "+34 600 123 456",
    avatar: "/avatars/ana-garcia.jpg"
  },
  {
    id: 2,
    nombre: "Carlos Martínez",
    rol: "Parte invitada",
    email: "carlos.martinez@email.com",
    telefono: "+34 600 789 012",
    avatar: "/avatars/carlos-martinez.jpg"
  }
];

// Información básica del caso
const infoCaso = {
  id: "CASO-2023-001",
  titulo: "Mediación García / Martínez",
  tipo: "Divorcio con hijos",
  estado: "En proceso",
  fechaInicio: "15/06/2023",
  proximaAccion: "Sesión conjunta",
  fechaAccion: "24/07/2023",
  progreso: 50,
  descripcion: `Mediación familiar en proceso de divorcio con dos hijos menores (7 y 10 años). 
  Los principales temas a tratar son la custodia, régimen de visitas, pensión de alimentos y 
  reparto de bienes comunes. Ambas partes han mostrado disposición al diálogo y voluntad de 
  llegar a acuerdos que prioricen el bienestar de los menores.`
};

export default function CasoDetalle() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("general");
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  
  const handleSubmitMensaje = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando mensaje:", nuevoMensaje);
    // Aquí iría la lógica para enviar el mensaje
    setNuevoMensaje("");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavbarDashboard 
        rol="mediador"
      />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-6"
        >
          <motion.div className="flex items-center mb-8" variants={itemVariants}>
            <Button variant="ghost" className="mr-4" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
            <h1 className="text-3xl font-bold">{infoCaso.titulo}</h1>
            <Badge 
              className={`ml-4 ${
                infoCaso.estado === 'En proceso' ? 'bg-blue-100 text-blue-800' :
                infoCaso.estado === 'Suspendido' ? 'bg-red-100 text-red-800' :
                infoCaso.estado === 'Finalizado' ? 'bg-green-100 text-green-800' : ''
              }`}
            >
              {infoCaso.estado}
            </Badge>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
          >
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Información del caso</CardTitle>
                  <CardDescription>Detalles básicos y progreso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">ID del caso</p>
                        <p>{infoCaso.id}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Tipo</p>
                        <p>{infoCaso.tipo}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Fecha de inicio</p>
                        <p>{infoCaso.fechaInicio}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Próxima acción</p>
                        <p>{infoCaso.proximaAccion} ({infoCaso.fechaAccion})</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Progreso</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={infoCaso.progreso} className="h-2" />
                        <span className="text-sm">{infoCaso.progreso}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Descripción</p>
                      <p className="text-sm">{infoCaso.descripcion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Partes involucradas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {partes.map(parte => (
                      <div key={parte.id} className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={parte.avatar} />
                          <AvatarFallback>{parte.nombre.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{parte.nombre}</p>
                          <p className="text-sm text-gray-500">{parte.rol}</p>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" title="Correo electrónico">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Llamada">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Videollamada">
                            <Video className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <Tabs 
          defaultValue="general" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-5 h-auto md:h-10">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="sesiones">Sesiones</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
            <TabsTrigger value="mensajes">Mensajes</TabsTrigger>
            <TabsTrigger value="notas">Notas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <motion.div 
              className="grid grid-cols-1 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Proceso de mediación</CardTitle>
                    <CardDescription>Estado actual del proceso</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {estadosProceso.map((estado, index) => (
                        <div key={estado.id} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            {estado.completado ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-300" />
                            )}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <span className={`font-medium ${estado.completado ? "" : "text-gray-500"}`}>
                                {estado.nombre}
                              </span>
                              {estado.fecha && (
                                <span className="text-sm text-gray-500">{estado.fecha}</span>
                              )}
                            </div>
                            {index < estadosProceso.length - 1 && (
                              <div className="h-6 ml-2 border-l border-gray-200"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Próxima sesión</CardTitle>
                  </CardHeader>
                  {proximasSesiones.length > 0 ? (
                    <CardContent>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">{proximasSesiones[0].tipo}</h3>
                            <p className="text-sm text-gray-500">
                              {proximasSesiones[0].fecha} - {proximasSesiones[0].hora} ({proximasSesiones[0].duracion})
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {proximasSesiones[0].ubicacion}
                            </p>
                          </div>
                          <Badge>{proximasSesiones[0].estado}</Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Participantes:</p>
                          <div className="flex space-x-2">
                            {proximasSesiones[0].participantes.map((participante, i) => (
                              <Badge key={i} variant="outline">{participante}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            Modificar
                          </Button>
                          <Button size="sm" variant="outline">
                            <Send className="mr-2 h-4 w-4" />
                            Enviar recordatorio
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  ) : (
                    <CardContent>
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">No hay sesiones programadas</p>
                        <Button className="mt-4">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Programar nueva sesión
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Acciones rápidas</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button className="justify-start">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nueva sesión
                      </Button>
                      <Button className="justify-start" variant="outline">
                        <Paperclip className="mr-2 h-4 w-4" />
                        Subir documento
                      </Button>
                      <Button className="justify-start" variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Enviar mensaje
                      </Button>
                      <Button className="justify-start" variant="outline">
                        <Users className="mr-2 h-4 w-4" />
                        Añadir participante
                      </Button>
                      <Button className="justify-start" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Generar informe
                      </Button>
                      <Button className="justify-start" variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Editar caso
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="sesiones" className="mt-6">
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex justify-between items-center" variants={itemVariants}>
                <h2 className="text-2xl font-bold">Historial de sesiones</h2>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nueva sesión
                </Button>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Próximas sesiones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {proximasSesiones.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Hora</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Duración</TableHead>
                            <TableHead>Ubicación</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {proximasSesiones.map((sesion) => (
                            <TableRow key={sesion.id}>
                              <TableCell>{sesion.fecha}</TableCell>
                              <TableCell>{sesion.hora}</TableCell>
                              <TableCell>{sesion.tipo}</TableCell>
                              <TableCell>{sesion.duracion}</TableCell>
                              <TableCell>{sesion.ubicacion}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {sesion.estado}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                    <DropdownMenuItem>Enviar recordatorio</DropdownMenuItem>
                                    <DropdownMenuItem>Reprogramar</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">Cancelar</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No hay sesiones programadas</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Sesiones anteriores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {historialSesiones.length > 0 ? (
                      <Accordion type="multiple" className="w-full">
                        {historialSesiones.map((sesion) => (
                          <AccordionItem value={`sesion-${sesion.id}`} key={sesion.id}>
                            <AccordionTrigger>
                              <div className="flex items-center space-x-2 text-left">
                                <span className="font-medium">{sesion.fecha} - {sesion.tipo}</span>
                                <Badge variant="outline" className="ml-2">
                                  {sesion.duracion}
                                </Badge>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4 pl-2">
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Participantes:</p>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {sesion.participantes.map((participante, i) => (
                                      <Badge key={i} variant="outline">{participante}</Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Notas:</p>
                                  <p className="text-sm mt-1">{sesion.notas}</p>
                                </div>
                                
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Ver acta
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar notas
                                  </Button>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No hay sesiones anteriores</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="documentos" className="mt-6">
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex justify-between items-center" variants={itemVariants}>
                <h2 className="text-2xl font-bold">Documentos</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Solicitar documentos
                  </Button>
                  <Button>
                    <Paperclip className="mr-2 h-4 w-4" />
                    Subir documento
                  </Button>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Tamaño</TableHead>
                          <TableHead>Subido por</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documentos.map((documento) => (
                          <TableRow key={documento.id}>
                            <TableCell className="font-medium">{documento.nombre}</TableCell>
                            <TableCell>{documento.tipo}</TableCell>
                            <TableCell>{documento.tamaño}</TableCell>
                            <TableCell>{documento.subidoPor}</TableCell>
                            <TableCell>{documento.fechaSubida}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`
                                  ${documento.estado === 'Firmado' ? 'bg-green-50 text-green-700 border-green-200' :
                                    documento.estado === 'Pendiente firma' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                    'bg-blue-50 text-blue-700 border-blue-200'}
                                `}
                              >
                                {documento.estado}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>Ver</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    <span>Descargar</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share2 className="mr-2 h-4 w-4" />
                                    <span>Compartir</span>
                                  </DropdownMenuItem>
                                  {documento.estado === 'Pendiente firma' && (
                                    <DropdownMenuItem>
                                      <span>Solicitar firma</span>
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>Eliminar</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="mensajes" className="mt-6">
            <motion.div 
              className="grid grid-cols-1 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle>Mensajes del caso</CardTitle>
                    <CardDescription>
                      Canal de comunicación seguro entre todas las partes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-hidden">
                    <ScrollArea className="h-[380px] pr-4">
                      <div className="space-y-4">
                        {mensajes.map((mensaje) => (
                          <div key={mensaje.id} className="flex flex-col">
                            <div className="flex items-center">
                              <span className="font-medium">{mensaje.remitente}</span>
                              <span className="text-xs text-gray-500 ml-2">
                                {mensaje.fecha} {mensaje.hora}
                              </span>
                              {!mensaje.leido && (
                                <Badge className="ml-2 bg-blue-100 text-blue-800">Nuevo</Badge>
                              )}
                            </div>
                            <p className="text-sm mt-1">{mensaje.contenido}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <form onSubmit={handleSubmitMensaje} className="w-full">
                      <div className="flex space-x-2">
                        <Textarea
                          placeholder="Escribe un mensaje..."
                          value={nuevoMensaje}
                          onChange={(e) => setNuevoMensaje(e.target.value)}
                          className="min-h-[80px] flex-grow"
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                        <Button type="button" variant="outline" size="sm">
                          <Paperclip className="mr-2 h-4 w-4" />
                          Adjuntar
                        </Button>
                        <Button type="submit" size="sm">
                          <Send className="mr-2 h-4 w-4" />
                          Enviar
                        </Button>
                      </div>
                    </form>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="notas" className="mt-6">
            <motion.div 
              className="grid grid-cols-1 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card className="h-[600px]">
                  <CardHeader>
                    <CardTitle>Notas privadas</CardTitle>
                    <CardDescription>
                      Estas notas son visibles solo para ti como mediador
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Escribe tus notas privadas sobre el caso aquí..."
                      className="min-h-[400px]"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Guardar notas</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 