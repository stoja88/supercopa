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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { NavbarHome } from "@/components/ui/navbar-home";
import { Footer } from "@/components/ui/footer";
import { Check, X, ArrowRight, Globe, Shield, Users, Briefcase, FileText, Settings, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

export default function WhiteLabelBufetesPage() {
  const [activeTab, setActiveTab] = useState("caracteristicas");
  const [formData, setFormData] = useState({
    nombreBufete: "",
    nombreContacto: "",
    email: "",
    telefono: "",
    tamañoBufete: "",
    mensaje: "",
    serviciosInteres: [] as string[],
    presupuesto: "",
    comoNosConocio: "",
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
        const servicios = [...prev.serviciosInteres];
        if (checked) {
          servicios.push(id);
        } else {
          const index = servicios.indexOf(id);
          if (index !== -1) servicios.splice(index, 1);
        }
        return { ...prev, serviciosInteres: servicios };
      });
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, presupuesto: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, tamañoBufete: value }));
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
        description: "Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.",
      });
      
      // Resetear formulario
      setFormData({
        nombreBufete: "",
        nombreContacto: "",
        email: "",
        telefono: "",
        tamañoBufete: "",
        mensaje: "",
        serviciosInteres: [],
        presupuesto: "",
        comoNosConocio: "",
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
      title: "Personalización completa",
      description: "Adapta la plataforma con tu marca, colores y logotipo para ofrecer una experiencia coherente a tus clientes.",
      icon: <Settings className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Dominio personalizado",
      description: "Utiliza tu propio dominio para que tus clientes accedan a la plataforma directamente desde tu sitio web.",
      icon: <Globe className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Seguridad avanzada",
      description: "Protección de datos de nivel empresarial con cifrado de extremo a extremo y cumplimiento de RGPD.",
      icon: <Shield className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Gestión de usuarios",
      description: "Administra múltiples casos y clientes desde un panel de control centralizado y personalizado.",
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Integración con sistemas legales",
      description: "Conecta con tus herramientas de gestión legal existentes para un flujo de trabajo sin interrupciones.",
      icon: <Briefcase className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Documentación legal",
      description: "Plantillas personalizables para documentos legales específicos de tu bufete y jurisdicción.",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
    },
  ];

  const plans = [
    {
      name: "Básico",
      price: "€299",
      period: "/mes",
      description: "Ideal para pequeños bufetes que comienzan con la gestión digital de casos de coparentalidad",
      features: [
        "Hasta 20 casos activos",
        "Personalización básica (logo y colores)",
        "Subdominio personalizado",
        "Soporte por email",
        "Actualizaciones incluidas",
      ],
      limitations: [
        "Sin integración con sistemas externos",
        "Sin plantillas personalizadas",
        "Sin panel de administración avanzado",
      ],
      cta: "Solicitar demo",
      popular: false,
    },
    {
      name: "Profesional",
      price: "€499",
      period: "/mes",
      description: "Para bufetes establecidos que necesitan funcionalidades avanzadas y mayor capacidad",
      features: [
        "Hasta 100 casos activos",
        "Personalización completa",
        "Dominio personalizado",
        "Soporte prioritario",
        "Panel de administración avanzado",
        "Integración con 3 sistemas externos",
        "Plantillas personalizadas básicas",
      ],
      limitations: [
        "Personalización limitada de flujos de trabajo",
      ],
      cta: "Solicitar demo",
      popular: true,
    },
    {
      name: "Empresarial",
      price: "Personalizado",
      period: "",
      description: "Solución a medida para grandes bufetes con necesidades específicas y alto volumen de casos",
      features: [
        "Casos ilimitados",
        "Personalización total del sistema",
        "Integraciones ilimitadas",
        "Soporte dedicado 24/7",
        "Formación personalizada",
        "Desarrollo a medida",
        "Acuerdo de nivel de servicio (SLA)",
        "Infraestructura dedicada",
      ],
      limitations: [],
      cta: "Contactar",
      popular: false,
    },
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
          <Badge className="mb-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Solución para Bufetes</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Plataforma de Coparentalidad con tu Marca
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ofrece a tus clientes una herramienta digital avanzada para gestionar la coparentalidad, 
            completamente personalizada con la identidad de tu bufete.
          </p>
        </motion.div>

        <Tabs defaultValue="caracteristicas" value={activeTab} onValueChange={setActiveTab} className="w-full mb-16">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
            <TabsTrigger value="caracteristicas">Características</TabsTrigger>
            <TabsTrigger value="planes">Planes</TabsTrigger>
            <TabsTrigger value="solicitud">Solicitar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="caracteristicas" className="mt-8">
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
              className="mt-12 text-center"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setActiveTab("planes")}
              >
                Ver planes disponibles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="planes" className="mt-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {plans.map((plan, index) => (
                <motion.div 
                  key={index} 
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border ${
                    plan.popular 
                      ? "border-blue-500 dark:border-blue-400 relative" 
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  variants={itemVariants}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                        Más popular
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {plan.limitations.length > 0 && (
                      <div className="space-y-3 mb-6">
                        {plan.limitations.map((limitation, i) => (
                          <div key={i} className="flex items-start">
                            <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-500 dark:text-gray-400">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="px-6 pb-6">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? "bg-blue-600 hover:bg-blue-700" 
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                      }`}
                      onClick={() => setActiveTab("solicitud")}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-12 text-center"
              variants={itemVariants}
            >
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                ¿Necesitas una solución personalizada para tu bufete?
              </p>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setActiveTab("solicitud")}
              >
                Solicitar información
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="solicitud" className="mt-8">
            <motion.div 
              className="max-w-3xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Solicitud de información</CardTitle>
                  <CardDescription>
                    Completa el formulario y nos pondremos en contacto contigo para discutir cómo podemos adaptar nuestra plataforma a las necesidades de tu bufete.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombreBufete">Nombre del bufete</Label>
                        <Input 
                          id="nombreBufete" 
                          name="nombreBufete" 
                          value={formData.nombreBufete}
                          onChange={handleInputChange}
                          placeholder="Bufete Legal Asociados" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="nombreContacto">Nombre de contacto</Label>
                        <Input 
                          id="nombreContacto" 
                          name="nombreContacto" 
                          value={formData.nombreContacto}
                          onChange={handleInputChange}
                          placeholder="Juan Pérez" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email de contacto</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="info@bufete.com" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input 
                          id="telefono" 
                          name="telefono" 
                          type="tel" 
                          value={formData.telefono}
                          onChange={handleInputChange}
                          placeholder="+34 600 000 000" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tamañoBufete">Tamaño del bufete</Label>
                        <Select 
                          value={formData.tamañoBufete} 
                          onValueChange={handleSelectChange}
                        >
                          <SelectTrigger id="tamañoBufete">
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-5">1-5 abogados</SelectItem>
                            <SelectItem value="6-20">6-20 abogados</SelectItem>
                            <SelectItem value="21-50">21-50 abogados</SelectItem>
                            <SelectItem value="50+">Más de 50 abogados</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="presupuesto">Presupuesto mensual estimado</Label>
                        <RadioGroup 
                          value={formData.presupuesto}
                          onValueChange={handleRadioChange}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="200-500" id="r1" />
                            <Label htmlFor="r1">€200 - €500</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="500-1000" id="r2" />
                            <Label htmlFor="r2">€500 - €1000</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1000+" id="r3" />
                            <Label htmlFor="r3">Más de €1000</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Servicios de interés</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="personalizacion" 
                            checked={formData.serviciosInteres.includes("personalizacion")}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("personalizacion", checked as boolean)
                            }
                          />
                          <Label htmlFor="personalizacion">Personalización de marca</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="integracion" 
                            checked={formData.serviciosInteres.includes("integracion")}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("integracion", checked as boolean)
                            }
                          />
                          <Label htmlFor="integracion">Integración con sistemas</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="plantillas" 
                            checked={formData.serviciosInteres.includes("plantillas")}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("plantillas", checked as boolean)
                            }
                          />
                          <Label htmlFor="plantillas">Plantillas personalizadas</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="formacion" 
                            checked={formData.serviciosInteres.includes("formacion")}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange("formacion", checked as boolean)
                            }
                          />
                          <Label htmlFor="formacion">Formación y soporte</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Mensaje adicional</Label>
                      <Textarea 
                        id="mensaje" 
                        name="mensaje" 
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Cuéntanos más sobre las necesidades específicas de tu bufete..." 
                        rows={4} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="comoNosConocio">¿Cómo nos conociste?</Label>
                      <Input 
                        id="comoNosConocio" 
                        name="comoNosConocio" 
                        value={formData.comoNosConocio}
                        onChange={handleInputChange}
                        placeholder="Google, redes sociales, recomendación..." 
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
                        Acepto la <a href="/legal/privacidad" className="text-blue-600 hover:underline">política de privacidad</a> y 
                        los <a href="/legal/terminos" className="text-blue-600 hover:underline">términos de servicio</a>
                      </Label>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("planes")}>
                    Volver a planes
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
          <h2 className="text-3xl font-bold mb-6">¿Por qué elegir nuestra solución de marca blanca?</h2>
          <div className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              Nuestra plataforma de coparentalidad con marca blanca permite a los bufetes de abogados ofrecer 
              una herramienta digital avanzada a sus clientes, mejorando la experiencia y diferenciándose de la competencia.
            </p>
            <p>
              Con nuestra solución, podrás gestionar casos de familia de manera más eficiente, reducir conflictos 
              entre las partes y ofrecer un valor añadido que tus clientes apreciarán.
            </p>
          </div>
          
          <div className="mt-8">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setActiveTab("solicitud")}
            >
              Solicitar una demo personalizada
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
      
      <Footer />
    </>
  );
} 