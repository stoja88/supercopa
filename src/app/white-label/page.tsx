"use client";

import { motion } from "framer-motion";
import { Building2, Briefcase, Shield, Check, ArrowRight, Zap, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavbarHome } from "@/components/ui/navbar-home";
import { WhiteLabelSection } from "@/components/ui/white-label-section";
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

export default function WhiteLabelPage() {
  const testimonials = [
    {
      quote: "Implementar CoParent en nuestro bufete ha transformado la forma en que gestionamos los casos de familia. Nuestros clientes valoran enormemente esta herramienta.",
      author: "María Fernández",
      role: "Socia directora, Fernández & Asociados",
      avatar: "/avatars/testimonial-1.jpg"
    },
    {
      quote: "La solución de marca blanca nos ha permitido diferenciarnos de la competencia y ofrecer un servicio digital innovador que complementa perfectamente nuestra asesoría legal.",
      author: "Javier Rodríguez",
      role: "Director, Bufete Rodríguez",
      avatar: "/avatars/testimonial-2.jpg"
    },
    {
      quote: "Como mediadora familiar, la plataforma me ha proporcionado herramientas digitales que facilitan enormemente mi trabajo y mejoran la experiencia de las familias.",
      author: "Laura Gómez",
      role: "Mediadora familiar certificada",
      avatar: "/avatars/testimonial-3.jpg"
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
                Soluciones de marca blanca para profesionales
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Ofrezca a sus clientes una plataforma digital avanzada para la gestión de la coparentalidad, 
                totalmente personalizada con la identidad de su bufete o servicio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Solicitar demostración
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Ver planes y precios
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
                    src="/images/white-label-mockup.png" 
                    alt="Plataforma de marca blanca" 
                    className="rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800"
                  />
                  <div className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Personalización completa</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Logo, colores y dominio propio</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Beneficios Section */}
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
              Beneficios para su negocio
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Descubra cómo nuestra solución de marca blanca puede transformar su práctica profesional 
              y mejorar la experiencia de sus clientes.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariant} className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-800 transition-all duration-300 hover:shadow-lg">
              <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-lg inline-block mb-4">
                <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Diferenciación competitiva</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Destaque frente a otros bufetes ofreciendo una herramienta digital innovadora 
                que mejora significativamente la experiencia de sus clientes.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariant} className="bg-indigo-50 dark:bg-indigo-900/10 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg">
              <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-lg inline-block mb-4">
                <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mayor eficiencia</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Reduzca el tiempo dedicado a tareas administrativas y comunicaciones, 
                permitiéndole centrarse en el asesoramiento legal de valor añadido.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariant} className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-6 border border-purple-100 dark:border-purple-800 transition-all duration-300 hover:shadow-lg">
              <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-lg inline-block mb-4">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fidelización de clientes</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fortalezca la relación con sus clientes ofreciéndoles una herramienta 
                que utilizarán regularmente, manteniendo su marca presente.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariant} className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 border border-green-100 dark:border-green-800 transition-all duration-300 hover:shadow-lg">
              <div className="bg-green-100 dark:bg-green-800 p-3 rounded-lg inline-block mb-4">
                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Documentación organizada</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Acceda a todos los documentos, acuerdos y comunicaciones en un solo lugar, 
                mejorando la gestión de casos y el seguimiento de acuerdos.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariant} className="bg-yellow-50 dark:bg-yellow-900/10 rounded-xl p-6 border border-yellow-100 dark:border-yellow-800 transition-all duration-300 hover:shadow-lg">
              <div className="bg-yellow-100 dark:bg-yellow-800 p-3 rounded-lg inline-block mb-4">
                <Shield className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Seguridad y cumplimiento</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Garantice la confidencialidad y el cumplimiento normativo con una plataforma 
                diseñada específicamente para el ámbito legal y familiar.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariant} className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border border-red-100 dark:border-red-800 transition-all duration-300 hover:shadow-lg">
              <div className="bg-red-100 dark:bg-red-800 p-3 rounded-lg inline-block mb-4">
                <Briefcase className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Nuevas fuentes de ingresos</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cree nuevas líneas de negocio ofreciendo la plataforma como un servicio 
                adicional o incluido en sus paquetes de asesoramiento legal.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* White Label Section */}
      <WhiteLabelSection />
      
      {/* Testimonials Section */}
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
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Profesionales del ámbito legal y de la mediación familiar que ya utilizan 
              nuestra solución de marca blanca.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={itemVariant}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-blue-200 dark:border-blue-800">
                    <img src={testimonial.avatar} alt={testimonial.author} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection 
        title="Transforme su práctica profesional" 
        description="Ofrezca a sus clientes una experiencia digital innovadora con nuestra solución de marca blanca."
        buttonText="Solicitar información"
        buttonLink="/contact"
      />
      
      <Footer />
    </div>
  );
} 