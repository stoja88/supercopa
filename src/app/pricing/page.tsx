"use client";

import { NavbarHome } from "@/components/ui/navbar-home";
import { PricingSection } from "@/components/ui/pricing-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { CTASection } from "@/components/ui/cta-section";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function PricingPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const benefits = [
    "Acceso a todas las características según el plan elegido",
    "Actualizaciones gratuitas y nuevas funcionalidades",
    "Soporte técnico dedicado",
    "Cancelación en cualquier momento",
    "Garantía de devolución de 30 días"
  ];

  const faqs = [
    {
      question: "¿Puedo cambiar de plan en cualquier momento?",
      answer: "Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente y se ajustará el cobro prorrateado."
    },
    {
      question: "¿Hay un período de prueba gratuito?",
      answer: "Sí, ofrecemos una prueba gratuita de 14 días en todos nuestros planes premium para que puedas probar todas las características antes de decidirte."
    },
    {
      question: "¿Cómo funciona la facturación?",
      answer: "La facturación se realiza de forma mensual o anual, según el plan que elijas. Aceptamos todas las principales tarjetas de crédito y débito, así como PayPal."
    },
    {
      question: "¿Puedo cancelar mi suscripción?",
      answer: "Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de control. No hay contratos a largo plazo ni penalizaciones por cancelación."
    },
    {
      question: "¿Qué pasa si necesito ayuda con mi cuenta?",
      answer: "Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta o problema. Puedes contactarnos por email, chat o teléfono, dependiendo de tu plan."
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
              Planes simples y transparentes
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Sin sorpresas ni costos ocultos. Elige el plan que mejor se adapte a las necesidades de tu familia.
            </p>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <PricingSection />
      
      {/* Benefits Section */}
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
              Todos los planes incluyen
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Beneficios estándar disponibles para todos nuestros usuarios
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700 dark:text-gray-300">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
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
              Preguntas frecuentes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Respuestas a las preguntas más comunes sobre nuestros planes y precios
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      <CTASection />
      <Footer />
    </main>
  );
} 