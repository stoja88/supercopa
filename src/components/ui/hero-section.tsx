"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
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

  const features = [
    "Calendario compartido",
    "Mensajería segura",
    "Seguimiento de gastos",
    "Gestión de documentos"
  ];

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="/hero-pattern.svg" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 text-gray-50 dark:text-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path 
            fill="currentColor" 
            fillOpacity="1" 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
              variants={fadeIn}
            >
              Simplifica la <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">co-parentalidad</span> con nuestra plataforma
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl"
              variants={fadeIn}
            >
              Herramientas intuitivas para mejorar la comunicación, coordinación y colaboración entre padres separados.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-10"
              variants={fadeIn}
            >
              <Link href="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto">
                  Comenzar gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 text-lg px-8 py-6 h-auto">
                  Ver demo
                </Button>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Características principales:
              </p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                {features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3"></div>
              <div className="p-6">
                <img 
                  src="https://placehold.co/600x400/e2e8f0/475569?text=CoParent+Dashboard" 
                  alt="CoParent Dashboard Preview" 
                  className="rounded-lg shadow-md w-full"
                />
                <div className="mt-6 space-y-4">
                  <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-md w-3/4"></div>
                  <div className="h-24 bg-gray-100 dark:bg-gray-700 rounded-md"></div>
                  <div className="flex space-x-4">
                    <div className="h-10 bg-blue-100 dark:bg-blue-900/30 rounded-md w-1/3"></div>
                    <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded-md w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 