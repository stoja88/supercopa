"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Calendar, FileText, Users, Shield, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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

export function MediatorSection() {
  const [activeMediator, setActiveMediator] = useState(null);

  const mediators = [
    {
      id: 1,
      name: "Dra. Elena Martínez",
      role: "Mediadora Familiar",
      avatar: "/avatars/mediator-1.jpg",
      specialties: ["Custodia compartida", "Régimen de visitas", "Pensión alimenticia"],
      languages: ["Español", "Inglés", "Catalán"],
      experience: "12 años",
      rating: 4.9,
      reviews: 87,
      availability: "Disponible en 2 días",
      description: "Especialista en mediación familiar con enfoque en soluciones centradas en el bienestar de los menores. Doctora en Psicología y experta en comunicación no violenta."
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Abogado Mediador",
      avatar: "/avatars/mediator-2.jpg",
      specialties: ["Acuerdos económicos", "Modificación de medidas", "Mediación internacional"],
      languages: ["Español", "Francés"],
      experience: "8 años",
      rating: 4.7,
      reviews: 62,
      availability: "Disponible hoy",
      description: "Abogado especializado en derecho de familia con formación específica en mediación. Enfoque práctico y orientado a resultados con amplia experiencia en casos complejos."
    },
    {
      id: 3,
      name: "Laura Sánchez",
      role: "Psicóloga Mediadora",
      avatar: "/avatars/mediator-3.jpg",
      specialties: ["Comunicación parental", "Gestión de conflictos", "Adaptación de menores"],
      languages: ["Español", "Inglés"],
      experience: "10 años",
      rating: 4.8,
      reviews: 75,
      availability: "Disponible en 3 días",
      description: "Psicóloga especializada en familias en transición. Experta en facilitar la comunicación entre padres y ayudar a los menores a adaptarse a los cambios familiares."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Mediación profesional
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nuestros mediadores certificados pueden ayudarles a alcanzar acuerdos 
            satisfactorios para todas las partes, priorizando el bienestar de los menores.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {mediators.map((mediator) => (
            <motion.div key={mediator.id} variants={itemVariant}>
              <Card 
                className={`h-full transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  activeMediator === mediator.id ? 'ring-2 ring-blue-500 shadow-xl' : ''
                }`}
                onClick={() => setActiveMediator(activeMediator === mediator.id ? null : mediator.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16 border-2 border-blue-100 dark:border-blue-800">
                      <AvatarImage src={mediator.avatar} alt={mediator.name} />
                      <AvatarFallback>{mediator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{mediator.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{mediator.role}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1 text-sm font-medium">{mediator.rating}</span>
                        </div>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                        <span className="text-sm text-gray-500">{mediator.reviews} reseñas</span>
                      </div>
                      <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                        {mediator.availability}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{mediator.description}</p>
                  </div>
                  
                  {activeMediator === mediator.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Especialidades</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {mediator.specialties.map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Idiomas</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {mediator.languages.map((language, index) => (
                              <span key={index} className="text-xs text-gray-600 dark:text-gray-400">
                                {language}{index < mediator.languages.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Experiencia</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{mediator.experience}</p>
                        </div>
                        
                        <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                          Solicitar mediación
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Cómo funciona la mediación?</h3>
              <p className="mb-6 opacity-90">
                La mediación es un proceso voluntario que ayuda a las partes a alcanzar acuerdos 
                satisfactorios con la ayuda de un profesional neutral e imparcial.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-3 mt-0.5">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Sesión informativa</h4>
                    <p className="text-sm opacity-80">Conoce el proceso y al mediador sin compromiso</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-3 mt-0.5">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Sesiones de mediación</h4>
                    <p className="text-sm opacity-80">De 4 a 6 sesiones para trabajar en los acuerdos</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-3 mt-0.5">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Redacción de acuerdos</h4>
                    <p className="text-sm opacity-80">Documentación de los acuerdos alcanzados</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-3 mt-0.5">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Validación legal</h4>
                    <p className="text-sm opacity-80">Los acuerdos pueden elevarse a escritura pública</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Beneficios de la mediación</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-300 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Proceso más rápido y económico que la vía judicial</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-300 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Mayor control sobre las decisiones y acuerdos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-300 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Reduce el conflicto y mejora la comunicación</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-300 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Protege el bienestar emocional de los hijos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-300 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Acuerdos más duraderos y satisfactorios</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-300 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Confidencialidad garantizada</span>
                </li>
              </ul>
              
              <Button className="w-full mt-6 bg-white text-blue-600 hover:bg-blue-50">
                Solicitar información
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 