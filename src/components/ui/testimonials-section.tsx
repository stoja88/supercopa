"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const testimonials = [
    {
      quote: "CoParent ha transformado nuestra dinámica familiar. Ahora podemos coordinar horarios y actividades sin conflictos ni malentendidos.",
      author: "María G.",
      role: "Madre de dos niños",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      quote: "La aplicación nos ha ayudado a mantener una comunicación clara y documentada. Los recordatorios automáticos son especialmente útiles.",
      author: "Carlos M.",
      role: "Padre de una niña",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      quote: "El seguimiento de gastos ha eliminado muchas discusiones. Ahora todo es transparente y equitativo entre nosotros.",
      author: "Laura P.",
      role: "Madre de tres niños",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      quote: "Como mediador familiar, recomiendo CoParent a todas las familias con las que trabajo. Es una herramienta que realmente facilita la co-parentalidad.",
      author: "Dr. Javier R.",
      role: "Mediador familiar",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Lo que dicen nuestras familias
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Historias reales de padres que han mejorado su experiencia de co-parentalidad
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div 
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2">
                    <Quote className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              <div>
                <blockquote className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-300 mb-6">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{testimonials[activeIndex].author}</p>
                  <p className="text-gray-600 dark:text-gray-400">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex 
                      ? "bg-blue-600 w-6" 
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 