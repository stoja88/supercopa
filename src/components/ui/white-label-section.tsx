"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, Building2, Briefcase, Shield, Users, Palette, Code, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function WhiteLabelSection() {
  const [activeTab, setActiveTab] = useState("bufetes");

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Soluciones personalizadas para profesionales
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ofrecemos opciones de marca blanca y personalización para bufetes de abogados, 
            mediadores y profesionales del ámbito familiar.
          </p>
        </motion.div>

        <Tabs 
          defaultValue="bufetes" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full max-w-xl">
              <TabsTrigger value="bufetes" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Building2 className="h-4 w-4 mr-2" />
                Bufetes
              </TabsTrigger>
              <TabsTrigger value="mediadores" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Briefcase className="h-4 w-4 mr-2" />
                Mediadores
              </TabsTrigger>
              <TabsTrigger value="instituciones" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Shield className="h-4 w-4 mr-2" />
                Instituciones
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="bufetes" className="mt-2">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate={activeTab === "bufetes" ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <motion.div variants={itemVariant} className="relative">
                <Card className="overflow-hidden border-0 shadow-xl h-full">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white py-1 px-4 rounded-bl-lg text-sm font-medium">
                    Popular
                  </div>
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">Marca Blanca Premium</h3>
                      <p className="text-gray-600 dark:text-gray-300">Personalización completa para su bufete</p>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-4xl font-bold mb-2">
                        €499<span className="text-base font-normal text-gray-500">/mes</span>
                      </div>
                      <p className="text-sm text-gray-500">Facturación anual (€5,988/año)</p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Dominio personalizado</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Logo y colores de su marca</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Hasta 500 clientes activos</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Plantillas de documentos personalizadas</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Panel de administración avanzado</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Soporte prioritario 24/7</span>
                      </li>
                    </ul>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Solicitar demo
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariant} className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-lg mr-4">
                      <Palette className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Personalización completa</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Adapte la plataforma a la identidad visual de su bufete con colores, 
                        logos y estilos personalizados.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800">
                  <div className="flex items-start mb-4">
                    <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-lg mr-4">
                      <Code className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Integración con su sistema</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Conecte la plataforma con su sistema de gestión de casos y facturación 
                        para una experiencia unificada.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
                  <div className="flex items-start mb-4">
                    <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-lg mr-4">
                      <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Valor añadido para sus clientes</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Ofrezca a sus clientes una herramienta digital innovadora que mejora 
                        su experiencia y refuerza la relación con su bufete.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Ver demostración en vídeo
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="mediadores" className="mt-2">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate={activeTab === "mediadores" ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <motion.div variants={itemVariant} className="relative">
                <Card className="overflow-hidden border-0 shadow-xl h-full">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">Plataforma para Mediadores</h3>
                      <p className="text-gray-600 dark:text-gray-300">Herramientas especializadas para mediación familiar</p>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-4xl font-bold mb-2">
                        €299<span className="text-base font-normal text-gray-500">/mes</span>
                      </div>
                      <p className="text-sm text-gray-500">Facturación anual (€3,588/año)</p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Herramientas de mediación digital</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Plantillas de acuerdos personalizables</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Hasta 200 casos activos</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Sala de reuniones virtual</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Seguimiento de acuerdos</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Soporte técnico especializado</span>
                      </li>
                    </ul>
                    
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Solicitar información
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariant} className="space-y-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800">
                  <div className="flex items-start mb-4">
                    <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-lg mr-4">
                      <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Mediación asistida digitalmente</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Herramientas especializadas para facilitar el proceso de mediación, 
                        incluyendo salas virtuales y documentos colaborativos.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
                  <div className="flex items-start mb-4">
                    <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-lg mr-4">
                      <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Seguridad y confidencialidad</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Garantizamos la privacidad de las conversaciones y documentos 
                        compartidos durante el proceso de mediación.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-lg mr-4">
                      <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Seguimiento de acuerdos</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Monitorice el cumplimiento de los acuerdos alcanzados y facilite 
                        la comunicación continua entre las partes.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Solicitar demostración
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="instituciones" className="mt-2">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate={activeTab === "instituciones" ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <motion.div variants={itemVariant} className="relative">
                <Card className="overflow-hidden border-0 shadow-xl h-full">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">Solución Institucional</h3>
                      <p className="text-gray-600 dark:text-gray-300">Para servicios sociales y entidades públicas</p>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-4xl font-bold mb-2">
                        Personalizado
                      </div>
                      <p className="text-sm text-gray-500">Contacte para un presupuesto a medida</p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Integración con sistemas públicos</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Gestión de múltiples casos</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Cumplimiento normativo garantizado</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Informes estadísticos avanzados</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Formación para profesionales</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Soporte técnico dedicado</span>
                      </li>
                    </ul>
                    
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Solicitar información
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariant} className="space-y-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
                  <div className="flex items-start mb-4">
                    <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-lg mr-4">
                      <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Cumplimiento normativo</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Garantizamos el cumplimiento de todas las normativas de protección 
                        de datos y regulaciones específicas del sector público.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-lg mr-4">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Gestión de casos a gran escala</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Plataforma diseñada para manejar un gran volumen de casos 
                        simultáneamente con eficiencia y organización.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800">
                  <div className="flex items-start mb-4">
                    <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-lg mr-4">
                      <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Informes y estadísticas</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Obtenga datos valiosos sobre tendencias, resultados y eficiencia 
                        para mejorar los servicios públicos de apoyo familiar.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Descargar dossier informativo
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mt-20 text-center"
        >
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Solicitar una consulta personalizada
          </Button>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Nuestro equipo de especialistas le ayudará a encontrar la solución perfecta para su organización
          </p>
        </motion.div>
      </div>
    </section>
  );
} 