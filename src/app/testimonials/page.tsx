"use client";

import { NavbarHome } from "@/components/ui/navbar-home";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { CTASection } from "@/components/ui/cta-section";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function TestimonialsPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const detailedTestimonials = [
    {
      id: 1,
      name: "María González",
      role: "Madre de dos niños",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      quote: "Coparentalidad ha transformado la forma en que mi ex-pareja y yo gestionamos la crianza de nuestros hijos. La comunicación es mucho más fluida y organizada, y los niños se benefician enormemente de nuestra mejor coordinación.",
      rating: 5,
      date: "Marzo 2023"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Padre de una niña",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      quote: "Después del divorcio, coordinar las visitas y actividades de nuestra hija era un constante dolor de cabeza. Con esta plataforma, ahora tenemos un calendario compartido que nos mantiene a todos en la misma página. ¡Ha reducido nuestros conflictos en un 90%!",
      rating: 5,
      date: "Enero 2023"
    },
    {
      id: 3,
      name: "Laura Martínez",
      role: "Madre de tres niños",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      quote: "El seguimiento de gastos ha sido una función que ha eliminado muchas discusiones. Ahora tenemos un registro claro de quién ha pagado qué, y los reembolsos son mucho más sencillos. Recomendaría esta plataforma a cualquier familia en situación de coparentalidad.",
      rating: 4,
      date: "Abril 2023"
    },
    {
      id: 4,
      name: "Javier López",
      role: "Padre de dos niños",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      quote: "Como padre que vive en otra ciudad, esta plataforma me ha permitido mantenerme involucrado en la vida diaria de mis hijos. Las actualizaciones y la mensajería integrada me hacen sentir conectado incluso cuando estoy lejos.",
      rating: 5,
      date: "Febrero 2023"
    },
    {
      id: 5,
      name: "Ana Sánchez",
      role: "Madre de un niño",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      quote: "Los recordatorios automáticos para eventos importantes y citas médicas han sido increíblemente útiles. Ya no tenemos que preocuparnos por olvidar algo importante relacionado con nuestro hijo.",
      rating: 4,
      date: "Mayo 2023"
    },
    {
      id: 6,
      name: "Miguel Fernández",
      role: "Padre de gemelos",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      quote: "La función de almacenamiento de documentos nos permite guardar informes escolares, recetas médicas y otros documentos importantes en un solo lugar accesible para ambos. Es una característica que no sabía que necesitábamos hasta que la tuvimos.",
      rating: 5,
      date: "Junio 2023"
    }
  ];

  const videoTestimonials = [
    {
      id: 1,
      name: "Familia García-Pérez",
      thumbnail: "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Cómo Coparentalidad ayudó a esta familia a mejorar su comunicación y coordinación después del divorcio."
    },
    {
      id: 2,
      name: "Roberto y Elena",
      thumbnail: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Una historia de éxito sobre cómo dos padres lograron crear un ambiente estable para sus hijos a pesar de la separación."
    },
    {
      id: 3,
      name: "Familia Multicultural",
      thumbnail: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Cómo esta plataforma ayudó a una familia multicultural a mantener las tradiciones de ambos padres en la vida de sus hijos."
    }
  ];

  return (
    <main className="min-h-screen">
      <NavbarHome />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Historias reales de familias como la tuya
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Descubre cómo Coparentalidad está ayudando a miles de familias a crear un ambiente más armonioso para sus hijos.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Testimonial */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <motion.div 
            className="bg-blue-50 dark:bg-gray-700 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
              <Quote size={160} className="text-blue-500 dark:text-blue-300" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <div className="relative w-48 h-48 mx-auto">
                  <Image 
                    src="https://randomuser.me/api/portraits/women/23.jpg"
                    alt="Testimonio destacado"
                    fill
                    className="rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-200 mb-6">
                  "Después de probar varias aplicaciones y métodos para coordinar la crianza con mi ex-esposo, finalmente encontramos Coparentalidad. Ha sido un cambio radical en nuestra dinámica familiar. Nuestros hijos notan la diferencia y están mucho más tranquilos ahora que nosotros estamos mejor organizados."
                </blockquote>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Patricia Morales</h3>
                  <p className="text-gray-600 dark:text-gray-300">Madre de dos niños • Cliente desde 2022</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Detailed Testimonials Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Miles de familias confían en nuestra plataforma para mejorar su experiencia de coparentalidad
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedTestimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 mr-4">
                      <Image 
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{testimonial.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Video Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Historias en video
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Escucha directamente de las familias cómo nuestra plataforma ha mejorado sus vidas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoTestimonials.map((video, index) => (
              <motion.div 
                key={video.id}
                className="rounded-lg overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-video cursor-pointer group">
                  <Image 
                    src={video.thumbnail}
                    alt={video.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
                    <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-blue-600 border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{video.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Standard Testimonials Section */}
      <TestimonialsSection />
      
      <CTASection />
      <Footer />
    </main>
  );
} 