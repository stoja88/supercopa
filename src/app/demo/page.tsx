"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NavbarHome } from "@/components/ui/navbar-home";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Play, CheckCircle, Calendar, MessageSquare, FileText, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("padres");
  
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
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <NavbarHome />
      
      <motion.div 
        className="py-16 md:py-24"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="container-custom">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" variants={fadeIn}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Descubre cómo <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CoParentalidad</span> puede ayudarte
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Explora nuestra plataforma y conoce todas las herramientas que tenemos para facilitar la comunicación y coordinación entre padres separados.
            </p>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full max-w-md mx-auto mb-12">
                <TabsTrigger value="padres" className="flex-1">Para Padres</TabsTrigger>
                <TabsTrigger value="mediadores" className="flex-1">Para Mediadores</TabsTrigger>
                <TabsTrigger value="abogados" className="flex-1">Para Abogados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="padres" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Simplifica la coordinación parental</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      Nuestra plataforma está diseñada para ayudar a los padres separados a gestionar todos los aspectos de la crianza compartida en un solo lugar.
                    </p>
                    
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Calendario compartido para coordinar visitas y actividades</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Mensajería segura para una comunicación efectiva</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Gestión de gastos compartidos y seguimiento de pagos</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Almacenamiento de documentos importantes</span>
                      </li>
                    </ul>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/register">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Comenzar gratis
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" className="border-blue-600 text-blue-600">
                        <Play className="mr-2 h-4 w-4" />
                        Ver video tutorial
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                    <Image 
                      src="/images/dashboard-preview.png" 
                      alt="Dashboard de CoParentalidad"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback para cuando la imagen no existe
                        e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=Dashboard+Preview";
                      }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  <Card>
                    <CardHeader>
                      <Calendar className="h-12 w-12 text-blue-600 mb-4" />
                      <CardTitle>Calendario Compartido</CardTitle>
                      <CardDescription>Coordina visitas y actividades sin confusiones</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        Mantén un calendario compartido con el otro progenitor para coordinar visitas, actividades escolares, citas médicas y más.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <MessageSquare className="h-12 w-12 text-blue-600 mb-4" />
                      <CardTitle>Mensajería Segura</CardTitle>
                      <CardDescription>Comunicación efectiva y documentada</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        Comunícate de manera efectiva con mensajes organizados por temas y un historial completo de todas las conversaciones.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
                      <CardTitle>Gestión de Gastos</CardTitle>
                      <CardDescription>Control transparente de gastos compartidos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        Registra, aprueba y realiza un seguimiento de todos los gastos compartidos relacionados con los hijos.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <FileText className="h-12 w-12 text-blue-600 mb-4" />
                      <CardTitle>Documentos Importantes</CardTitle>
                      <CardDescription>Almacenamiento seguro y accesible</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        Guarda y comparte documentos importantes como informes escolares, recetas médicas o acuerdos legales.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold mb-6">¿Listo para empezar?</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Regístrate hoy y comienza a disfrutar de una co-parentalidad más organizada y con menos conflictos.
                  </p>
                  
                  <Link href="/register">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Crear cuenta gratuita
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="mediadores" className="mt-0">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold mb-6">Herramientas para mediadores familiares</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Potencia tu práctica de mediación con nuestra plataforma especializada.
                  </p>
                </div>
                
                {/* Contenido para mediadores */}
                <div className="text-center mt-16">
                  <Link href="/mediacion/mediadores">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Explorar soluciones para mediadores
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="abogados" className="mt-0">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold mb-6">Soluciones para abogados de familia</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Ofrece un valor añadido a tus clientes con nuestra plataforma de gestión de co-parentalidad.
                  </p>
                </div>
                
                {/* Contenido para abogados */}
                <div className="text-center mt-16">
                  <Link href="/contacto?tema=abogados">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Contactar para más información
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
      
      <Footer />
    </>
  );
} 