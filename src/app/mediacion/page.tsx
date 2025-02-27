"use client";

import { motion } from "framer-motion";
import { MessageSquare, Calendar, FileText, Shield, Check, ArrowRight, Users, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavbarHome } from "@/components/ui/navbar-home";
import { MediatorSection } from "@/components/ui/mediator-section";
import { CTASection } from "@/components/ui/cta-section";
import { Footer } from "@/components/ui/footer";

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

export default function MediationPage() {
  const mediationSteps = [
    {
      title: "Sesión informativa",
      description: "Conoce el proceso de mediación y al mediador sin compromiso. Resolveremos todas tus dudas.",
      icon: <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Sesiones de mediación",
      description: "De 4 a 6 sesiones para trabajar en los acuerdos con la ayuda del mediador profesional.",
      icon: <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
    },
    {
      title: "Redacción de acuerdos",
      description: "Documentación detallada de los acuerdos alcanzados durante el proceso de mediación.",
      icon: <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
    },
    {
      title: "Validación legal",
      description: "Los acuerdos pueden elevarse a escritura pública para garantizar su cumplimiento.",
      icon: <Scale className="h-6 w-6 text-green-600 dark:text-green-400" />
    }
  ];

  const mediationBenefits = [
    {
      title: "Proceso más rápido y económico",
      description: "La mediación es significativamente más rápida y económica que un proceso judicial tradicional.",
      icon: <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Control sobre las decisiones",
      description: "Las partes mantienen el control sobre las decisiones que afectan a sus hijos y su futuro.",
      icon: <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
    },
    {
      title: "Reduce el conflicto",
      description: "Mejora la comunicación y reduce el nivel de conflicto entre los progenitores.",
      icon: <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
    },
    {
      title: "Protege el bienestar emocional",
      description: "Minimiza el impacto emocional negativo en los hijos durante el proceso de separación.",
      icon: <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <NavbarHome />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="md:w-1/2 md:pr-12 mb-10 md:mb-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mediación familiar profesional
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Facilitamos el diálogo y los acuerdos entre progenitores, priorizando 
                siempre el bienestar de los menores con mediadores certificados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Solicitar mediación
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Conocer el proceso
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/2"
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <img 
                    src="/images/mediation-hero.jpg" 
                    alt="Mediación familiar" 
                    className="rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800"
                  />
                  <div className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Mediadores certificados</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Profesionales con experiencia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              El proceso de mediación
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              La mediación es un proceso voluntario que ayuda a las partes a alcanzar acuerdos 
              satisfactorios con la ayuda de un profesional neutral e imparcial.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {mediationSteps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={itemVariant}
                className="relative"
              >
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-800 h-full">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-full inline-flex items-center justify-center shadow-md mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
                
                {index < mediationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-blue-300 dark:text-blue-700" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Beneficios de la mediación
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              La mediación ofrece numerosas ventajas frente a los procesos judiciales tradicionales, 
              especialmente en asuntos relacionados con la familia.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {mediationBenefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                variants={itemVariant}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mr-4">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Preguntas frecuentes
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Resolvemos tus dudas sobre el proceso de mediación familiar.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {[
              {
                question: "¿Qué asuntos se pueden tratar en mediación familiar?",
                answer: "En la mediación familiar se pueden abordar todos los aspectos relacionados con la separación o divorcio: custodia de los hijos, régimen de visitas, pensión de alimentos, uso de la vivienda familiar, reparto de bienes, etc. También es útil para resolver conflictos familiares no relacionados con separaciones."
              },
              {
                question: "¿Es obligatorio llegar a un acuerdo en la mediación?",
                answer: "No, la mediación es un proceso voluntario en todas sus fases. Las partes pueden abandonar el proceso en cualquier momento y solo se firmarán los acuerdos que ambas partes consideren satisfactorios."
              },
              {
                question: "¿Qué validez legal tienen los acuerdos alcanzados?",
                answer: "Los acuerdos de mediación pueden elevarse a escritura pública ante notario o incorporarse a un convenio regulador que será aprobado judicialmente, adquiriendo así plena validez legal y carácter ejecutivo."
              },
              {
                question: "¿Qué ocurre si ya hemos iniciado un proceso judicial?",
                answer: "Es posible acudir a mediación aunque ya se haya iniciado un proceso judicial. De hecho, en muchos casos el juez puede recomendar o derivar a las partes a mediación. Si se alcanza un acuerdo, se puede incorporar al procedimiento judicial en curso."
              },
              {
                question: "¿Cuánto tiempo dura el proceso de mediación?",
                answer: "La duración depende de la complejidad de los asuntos a tratar y de la disposición de las partes. Generalmente, se resuelve en 4-6 sesiones de aproximadamente 1,5 horas cada una, distribuidas en un periodo de 1-3 meses."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                variants={itemVariant}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
              >
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Mediator Section */}
      <MediatorSection />
      
      {/* CTA Section */}
      <CTASection 
        title="Comienza el proceso de mediación" 
        description="Nuestros mediadores profesionales te ayudarán a encontrar soluciones satisfactorias para todas las partes."
        buttonText="Solicitar mediación"
        buttonLink="/contact"
      />
      
      <Footer />
    </div>
  );
} 