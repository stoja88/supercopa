"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { NavbarHome } from "@/components/ui/navbar-home";
import { Footer } from "@/components/ui/footer";
import { Check, ArrowRight, Users, FileText, Calendar, MessageSquare, BarChart, Shield, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

export default function MediadoresPage() {
  const [activeTab, setActiveTab] = useState("plataforma");
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    especialidad: "",
    experiencia: "",
    numColegiado: "",
    formacion: "",
    mensaje: "",
    idiomas: [] as string[],
    disponibilidad: "",
    aceptaTerminos: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (id === "aceptaTerminos") {
      setFormData(prev => ({ ...prev, aceptaTerminos: checked }));
    } else {
      setFormData(prev => {
        const idiomas = [...prev.idiomas];
        if (checked) {
          idiomas.push(id);
        } else {
          const index = idiomas.indexOf(id);
          if (index !== -1) idiomas.splice(index, 1);
        }
        return { ...prev, idiomas: idiomas };
      });
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, disponibilidad: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceptaTerminos) {
      toast({
        title: "Error",
        description: "Debes aceptar los términos y condiciones para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulación de envío de formulario
    try {
      // En una implementación real, aquí iría la llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Solicitud enviada",
        description: "Hemos recibido tu solicitud. Revisaremos tu perfil y nos pondremos en contacto contigo pronto.",
      });
      
      // Resetear formulario
      setFormData({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        especialidad: "",
        experiencia: "",
        numColegiado: "",
        formacion: "",
        mensaje: "",
        idiomas: [],
        disponibilidad: "",
        aceptaTerminos: false
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al enviar tu solicitud. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      title: "Gestión de casos",
      description: "Administra todos tus casos de mediación familiar desde un único panel centralizado.",
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Documentación compartida",
      description: "Comparte y gestiona documentos importantes con las partes de forma segura.",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Calendario integrado",
      description: "Programa sesiones y envía recordatorios automáticos a todas las partes.",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Comunicación segura",
      description: "Canal de comunicación encriptado entre todas las partes involucradas.",
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Informes y seguimiento",
      description: "Genera informes detallados sobre el progreso de la mediación y acuerdos alcanzados.",
      icon: <BarChart className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Seguridad y privacidad",
      description: "Cumplimiento con RGPD y cifrado de extremo a extremo para proteger información sensible.",
      icon: <Shield className="h-6 w-6 text-blue-500" />,
    },
  ];

  const testimonials = [
    {
      quote: "La plataforma ha transformado mi práctica como mediador familiar. Ahora puedo gestionar más casos de forma eficiente y ofrecer un mejor servicio a mis clientes.",
      author: "Carlos Martínez",
      role: "Mediador Familiar, Madrid",
      avatar: "/avatars/mediator-1.jpg"
    },
    {
      quote: "La comunicación entre las partes ha mejorado significativamente gracias a las herramientas de la plataforma. Los acuerdos se alcanzan más rápido y son más duraderos.",
      author: "Ana Rodríguez",
      role: "Mediadora Familiar, Barcelona",
      avatar: "/avatars/mediator-2.jpg"
    },
    {
      quote: "Como mediador especializado en casos complejos, valoro enormemente la seguridad y privacidad que ofrece la plataforma. Mis clientes se sienten más cómodos compartiendo información sensible.",
      author: "Miguel Sánchez",
      role: "Mediador Familiar, Valencia",
      avatar: "/avatars/mediator-3.jpg"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Regístrate como mediador",
      description: "Completa el formulario con tus datos profesionales y credenciales."
    },
    {
      number: "02",
      title: "Verificación de credenciales",
      description: "Nuestro equipo verificará tu formación y experiencia como mediador."
    },
    {
      number: "03",
      title: "Configuración de perfil",
      description: "Personaliza tu perfil profesional que verán los potenciales clientes."
    },
    {
      number: "04",
      title: "Formación en la plataforma",
      description: "Accede a nuestra formación para sacar el máximo partido a las herramientas."
    },
    {
      number: "05",
      title: "Comienza a mediar",
      description: "Empieza a gestionar casos de mediación familiar a través de la plataforma."
    }
  ];

  return (
    <>
      <NavbarHome />
      
      <motion.div 
        className="container mx-auto py-16 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <Badge className="mb-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Mediadores Familiares</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Potencia tu labor como mediador familiar
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Únete a nuestra red de mediadores profesionales y accede a herramientas digitales 
            diseñadas específicamente para facilitar la mediación familiar.
          </p>
        </motion.div>

        <Tabs defaultValue="plataforma" value={activeTab} onValueChange={setActiveTab} className="w-full mb-16">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
            <TabsTrigger value="plataforma">La Plataforma</TabsTrigger>
            <TabsTrigger value="proceso">Proceso</TabsTrigger>
            <TabsTrigger value="registro">Registro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plataforma" className="mt-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
                  variants={itemVariants}
                >
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-16"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold mb-8 text-center">Lo que dicen nuestros mediadores</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
                    variants={itemVariants}
                  >
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                        <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-12 text-center"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setActiveTab("proceso")}
              >
                Conocer el proceso
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="proceso" className="mt-8">
            <motion.div 
              className="max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-1 gap-8">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-6"
                    variants={itemVariants}
                  >
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
                      {step.number}
                    </div>
                    <div className="flex-grow pt-2">
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                      {index < steps.length - 1 && (
                        <div className="border-l-2 border-dashed border-gray-300 dark:border-gray-700 h-8 ml-8 mt-4"></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800"
                variants={itemVariants}
              >
                <h3 className="text-xl font-semibold mb-4">Beneficios para mediadores</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <p>Mayor visibilidad profesional en nuestra red de usuarios</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <p>Herramientas digitales especializadas para mediación familiar</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <p>Reducción de tareas administrativas y gestión de documentos</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <p>Comunicación segura y eficiente con todas las partes</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <p>Formación continua y recursos profesionales</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <p>Comunidad de mediadores para compartir experiencias</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-12 text-center"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setActiveTab("registro")}
              >
                Registrarme como mediador
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="registro" className="mt-8">
            <motion.div 
              className="max-w-3xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Registro de mediador familiar</CardTitle>
                  <CardDescription>
                    Completa el formulario con tus datos profesionales para unirte a nuestra red de mediadores.
                    Revisaremos tu solicitud y nos pondremos en contacto contigo en un plazo de 48 horas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input 
                          id="nombre" 
                          name="nombre" 
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Tu nombre" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="apellidos">Apellidos</Label>
                        <Input 
                          id="apellidos" 
                          name="apellidos" 
                          value={formData.apellidos}
                          onChange={handleInputChange}
                          placeholder="Tus apellidos" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email profesional</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="tu@email.com" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono de contacto</Label>
                        <Input 
                          id="telefono" 
                          name="telefono" 
                          type="tel" 
                          value={formData.telefono}
                          onChange={handleInputChange}
                          placeholder="+34 600 000 000" 
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="especialidad">Especialidad</Label>
                        <Input 
                          id="especialidad" 
                          name="especialidad" 
                          value={formData.especialidad}
                          onChange={handleInputChange}
                          placeholder="Ej: Mediación familiar, divorcios..." 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="experiencia">Años de experiencia</Label>
                        <Input 
                          id="experiencia" 
                          name="experiencia" 
                          type="number" 
                          min="0"
                          value={formData.experiencia}
                          onChange={handleInputChange}
                          placeholder="Ej: 5" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="numColegiado">Número de colegiado (si aplica)</Label>
                        <Input 
                          id="numColegiado" 
                          name="numColegiado" 
                          value={formData.numColegiado}
                          onChange={handleInputChange}
                          placeholder="Número de colegiado" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="disponibilidad">Disponibilidad</Label>
                        <Select 
                          value={formData.disponibilidad} 
                          onValueChange={handleSelectChange}
                        >
                          <SelectTrigger id="disponibilidad">
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tiempo-completo">Tiempo completo</SelectItem>
                            <SelectItem value="tiempo-parcial">Tiempo parcial</SelectItem>
                            <SelectItem value="fines-semana">Fines de semana</SelectItem>
                            <SelectItem value="flexible">Horario flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="formacion">Formación y certificaciones</Label>
                      <Textarea 
                        id="formacion" 
                        name="formacion" 
                        value={formData.formacion}
                        onChange={handleInputChange}
                        placeholder="Detalla tu formación en mediación familiar y otras certificaciones relevantes..." 
                        rows={3} 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Idiomas</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="espanol" 
                            checked={formData.idiomas.includes("espanol")}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("espanol", checked as boolean)
                            }
                          />
                          <Label htmlFor="espanol">Español</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="ingles" 
                            checked={formData.idiomas.includes("ingles")}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("ingles", checked as boolean)
                            }
                          />
                          <Label htmlFor="ingles">Inglés</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="frances" 
                            checked={formData.idiomas.includes("frances")}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("frances", checked as boolean)
                            }
                          />
                          <Label htmlFor="frances">Francés</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="aleman" 
                            checked={formData.idiomas.includes("aleman")}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("aleman", checked as boolean)
                            }
                          />
                          <Label htmlFor="aleman">Alemán</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="catalan" 
                            checked={formData.idiomas.includes("catalan")}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("catalan", checked as boolean)
                            }
                          />
                          <Label htmlFor="catalan">Catalán</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="gallego" 
                            checked={formData.idiomas.includes("gallego")}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("gallego", checked as boolean)
                            }
                          />
                          <Label htmlFor="gallego">Gallego</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="euskera" 
                            checked={formData.idiomas.includes("euskera")}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("euskera", checked as boolean)
                            }
                          />
                          <Label htmlFor="euskera">Euskera</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="otro" 
                            checked={formData.idiomas.includes("otro")}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("otro", checked as boolean)
                            }
                          />
                          <Label htmlFor="otro">Otro</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Información adicional</Label>
                      <Textarea 
                        id="mensaje" 
                        name="mensaje" 
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Cuéntanos más sobre tu experiencia como mediador y por qué quieres unirte a nuestra plataforma..." 
                        rows={4} 
                      />
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="aceptaTerminos" 
                        checked={formData.aceptaTerminos}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("aceptaTerminos", checked as boolean)
                        }
                        required
                      />
                      <Label htmlFor="aceptaTerminos" className="text-sm">
                        Acepto la <a href="/legal/privacidad" className="text-blue-600 hover:underline">política de privacidad</a>, 
                        los <a href="/legal/terminos" className="text-blue-600 hover:underline">términos de servicio</a> y 
                        el <a href="/legal/codigo-etico" className="text-blue-600 hover:underline">código ético para mediadores</a>
                      </Label>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("proceso")}>
                    Volver al proceso
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
        
        <motion.div className="mt-16 text-center" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-6">¿Tienes dudas sobre cómo funciona?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Agenda una demostración personalizada con nuestro equipo y descubre cómo nuestra plataforma 
            puede ayudarte a mejorar tu práctica como mediador familiar.
          </p>
          
          <div className="mt-8">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = '/contacto?tema=demo-mediadores'}
            >
              Solicitar una demostración
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
      
      <Footer />
    </>
  );
} 