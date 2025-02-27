"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function CTASection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-24 bg-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="/cta-pattern.svg" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
            variants={fadeIn}
          >
            Comienza a mejorar tu experiencia de co-parentalidad hoy mismo
          </motion.h2>
          
          <motion.p 
            className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto"
            variants={fadeIn}
          >
            Únete a miles de familias que ya están utilizando CoParent para coordinar, comunicar y colaborar de manera más efectiva.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeIn}
          >
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto">
                Registrarse gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-blue-700 text-lg px-8 py-6 h-auto">
                Contactar con ventas
              </Button>
            </Link>
          </motion.div>
          
          <motion.p 
            className="mt-8 text-blue-100 text-sm"
            variants={fadeIn}
          >
            No se requiere tarjeta de crédito. Prueba gratuita de 14 días en todos los planes premium.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
} 