"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const plans = [
    {
      name: "Básico",
      description: "Para familias que están comenzando con la coparentalidad",
      monthlyPrice: "9,99€",
      annualPrice: "7,99€",
      features: [
        "Calendario compartido básico",
        "Mensajería limitada",
        "100MB de almacenamiento",
        "Soporte por email",
        "1 familia"
      ],
      popular: false,
      ctaText: "Comenzar gratis",
      ctaLink: "/register"
    },
    {
      name: "Premium",
      description: "Para familias que necesitan herramientas más avanzadas",
      monthlyPrice: "19,99€",
      annualPrice: "15,99€",
      features: [
        "Calendario compartido avanzado",
        "Mensajería ilimitada",
        "5GB de almacenamiento",
        "Historial de gastos",
        "Informes detallados",
        "Soporte por email y chat",
        "1 familia"
      ],
      popular: true,
      ctaText: "Probar 14 días gratis",
      ctaLink: "/register?plan=premium"
    },
    {
      name: "Familiar",
      description: "Para familias con múltiples acuerdos de coparentalidad",
      monthlyPrice: "29,99€",
      annualPrice: "23,99€",
      features: [
        "Todas las características Premium",
        "20GB de almacenamiento",
        "Plantillas de acuerdos",
        "Hasta 3 familias",
        "Soporte prioritario",
        "Soporte por email, chat y teléfono"
      ],
      popular: false,
      ctaText: "Probar 14 días gratis",
      ctaLink: "/register?plan=family"
    },
    {
      name: "Profesional",
      description: "Para abogados, mediadores y terapeutas familiares",
      monthlyPrice: "49,99€",
      annualPrice: "39,99€",
      features: [
        "Todas las características Familiar",
        "50GB de almacenamiento",
        "Gestión de múltiples clientes",
        "Herramientas de informes avanzados",
        "Panel de administración profesional",
        "Personalización de documentos",
        "Soporte dedicado 24/7"
      ],
      popular: false,
      ctaText: "Contactar para demo",
      ctaLink: "/contact?demo=professional"
    }
  ];
  
  const savingPercentage = 20; // 20% de descuento en planes anuales

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
            Planes de precios
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`text-sm font-medium mr-4 ${billingCycle === "monthly" ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
              Facturación mensual
            </span>
            <button 
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${billingCycle === "annual" ? "translate-x-6" : "translate-x-1"}`} 
              />
            </button>
            <span className={`text-sm font-medium ml-4 ${billingCycle === "annual" ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
              Facturación anual <span className="text-green-500 font-semibold">(Ahorra {savingPercentage}%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden border ${plan.popular ? "border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-100 dark:shadow-none" : "border-gray-200 dark:border-gray-700"} transition-all hover:shadow-xl`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
                  Más popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 h-12">{plan.description}</p>
                
                <div className="mb-6">
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    {billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> /mes</span>
                  </p>
                  {billingCycle === "annual" && (
                    <p className="text-sm text-green-500 mt-1">Facturado anualmente</p>
                  )}
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={plan.ctaLink}
                  className={`block w-full py-3 px-4 rounded-lg text-center font-medium transition-colors ${plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"}`}
                >
                  {plan.ctaText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Opciones de pago por uso */}
        <motion.div 
          className="mt-16 bg-gray-50 dark:bg-gray-700 rounded-xl p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">¿Necesitas funcionalidades premium temporalmente?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ofrecemos opciones de pago por uso para familias que necesitan acceso a funcionalidades específicas por un tiempo limitado.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Pase de fin de semana</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Acceso a todas las funciones premium durante 3 días</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mb-3">4,99€</p>
              <a href="/register?plan=weekend" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Comprar ahora →</a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Pase semanal</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Acceso a todas las funciones premium durante 7 días</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mb-3">7,99€</p>
              <a href="/register?plan=weekly" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Comprar ahora →</a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Pase mensual</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Acceso a todas las funciones premium durante 30 días sin renovación</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mb-3">24,99€</p>
              <a href="/register?plan=monthly-once" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Comprar ahora →</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 