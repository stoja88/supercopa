"use client";

import { NavbarHome } from "@/components/ui/navbar-home";
import { FeaturesSection } from "@/components/ui/features-section";
import { CTASection } from "@/components/ui/cta-section";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Calendar, MessageSquare, FileText, Bell, CreditCard, Users, Shield, BarChart, Clock, Zap, Cloud, Lock } from "lucide-react";

export default function FeaturesPage() {
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

  const advancedFeatures = [
    {
      icon: <Zap className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
      title: "Notificaciones en tiempo real",
      description: "Recibe alertas instantáneas sobre cambios en el calendario, nuevos mensajes o actualizaciones de documentos importantes."
    },
    {
      icon: <Cloud className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
      title: "Sincronización multiplataforma",
      description: "Accede a toda la información desde cualquier dispositivo, con cambios sincronizados automáticamente en tiempo real."
    },
    {
      icon: <Lock className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
      title: "Seguridad avanzada",
      description: "Protección de datos con cifrado de extremo a extremo y autenticación de dos factores para mayor tranquilidad."
    }
  ];

  return (
    <main className="min-h-screen">
      <NavbarHome />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Características diseñadas para familias modernas
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Descubre todas las herramientas que CoParent ofrece para simplificar la coordinación y comunicación entre padres separados.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Features */}
      <FeaturesSection />
      
      {/* Advanced Features */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Características avanzadas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Funcionalidades premium para una experiencia de co-parentalidad sin complicaciones
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {advancedFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Feature Comparison */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Comparativa de planes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Encuentra el plan que mejor se adapte a tus necesidades
            </p>
          </motion.div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <th className="p-4 text-left text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">Característica</th>
                  <th className="p-4 text-center text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">Básico</th>
                  <th className="p-4 text-center text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">Premium</th>
                  <th className="p-4 text-center text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">Familiar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Calendario compartido</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">Básico</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">Avanzado</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">Avanzado</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Mensajería</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">Limitada</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">Ilimitada</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">Ilimitada</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Almacenamiento</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">100MB</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">5GB</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">20GB</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Historial de gastos</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">❌</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">✅</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">✅</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Informes detallados</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">❌</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">✅</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">✅</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Plantillas de acuerdos</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">❌</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">❌</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">✅</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Soporte</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">Email</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">Email y chat</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300">Email, chat y teléfono</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <CTASection />
      <Footer />
    </main>
  );
} 