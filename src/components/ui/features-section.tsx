"use client";

import { Calendar, MessageSquare, FileText, Bell, CreditCard, Users, Shield, BarChart, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturesSection() {
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

  const features = [
    {
      icon: <Calendar className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Calendario compartido",
      description: "Coordina horarios, eventos y actividades de los niños con un calendario compartido en tiempo real."
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Comunicación segura",
      description: "Mensajería integrada para una comunicación clara y documentada entre los padres."
    },
    {
      icon: <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Gestión de documentos",
      description: "Almacena y comparte documentos importantes como informes escolares, recetas médicas y acuerdos."
    },
    {
      icon: <Bell className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Recordatorios inteligentes",
      description: "Notificaciones automáticas para eventos importantes, citas médicas y responsabilidades compartidas."
    },
    {
      icon: <CreditCard className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Seguimiento de gastos",
      description: "Registra y divide los gastos relacionados con los niños de manera transparente y equitativa."
    },
    {
      icon: <Users className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Perfiles familiares",
      description: "Crea perfiles para cada miembro de la familia con información relevante y preferencias."
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Privacidad y seguridad",
      description: "Tus datos familiares están protegidos con las más altas medidas de seguridad y cifrado."
    },
    {
      icon: <BarChart className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Informes y estadísticas",
      description: "Visualiza el tiempo compartido, gastos y actividades para una co-parentalidad más equilibrada."
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Historial completo",
      description: "Accede al historial de todas las interacciones, acuerdos y decisiones tomadas a lo largo del tiempo."
    }
  ];

  return (
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
            Características diseñadas para familias modernas
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Herramientas que facilitan la coordinación y comunicación entre padres separados
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 