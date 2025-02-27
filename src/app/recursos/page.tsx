"use client";

import { NavbarHome } from "@/components/ui/navbar-home";
import { Footer } from "@/components/ui/footer";
import { CTASection } from "@/components/ui/cta-section";
import { motion } from "framer-motion";
import { Search, BookOpen, Video, FileText, Download, Lock, Star, Clock, Users, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function RecursosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const categories = [
    { id: "todos", name: "Todos los recursos" },
    { id: "cursos", name: "Cursos online", icon: <BookOpen className="h-5 w-5" /> },
    { id: "webinars", name: "Webinars", icon: <Video className="h-5 w-5" /> },
    { id: "plantillas", name: "Plantillas legales", icon: <FileText className="h-5 w-5" /> },
    { id: "guias", name: "Guías descargables", icon: <Download className="h-5 w-5" /> }
  ];
  
  const recursos = [
    {
      id: 1,
      title: "Comunicación efectiva en la coparentalidad",
      category: "cursos",
      image: "https://images.unsplash.com/photo-1591522810850-58128c5fb089?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Aprende técnicas prácticas para mejorar la comunicación con el otro progenitor y establecer patrones saludables de coparentalidad.",
      duration: "4 horas",
      lessons: 8,
      rating: 4.8,
      reviews: 124,
      instructor: "Dra. Laura Gómez",
      isPremium: true,
      price: "79€",
      featured: true
    },
    {
      id: 2,
      title: "Plantillas para acuerdos de custodia compartida",
      category: "plantillas",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Conjunto de plantillas legales personalizables para establecer acuerdos claros de custodia compartida, visitas y responsabilidades.",
      pages: 25,
      formats: ["PDF", "Word", "Pages"],
      rating: 4.9,
      reviews: 87,
      author: "Carlos Sánchez, Abogado",
      isPremium: true,
      price: "49€",
      featured: false
    },
    {
      id: 3,
      title: "Gestión emocional para niños durante el divorcio",
      category: "webinars",
      image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Webinar grabado con estrategias prácticas para ayudar a los niños a procesar sus emociones durante y después del divorcio.",
      duration: "90 minutos",
      rating: 4.7,
      reviews: 56,
      presenter: "Miguel Rodríguez, Psicólogo infantil",
      isPremium: false,
      price: "Gratuito",
      featured: false
    },
    {
      id: 4,
      title: "Guía completa de coparentalidad",
      category: "guias",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Manual detallado con consejos prácticos, ejercicios y recursos para establecer una coparentalidad efectiva y centrada en los niños.",
      pages: 120,
      formats: ["PDF", "ePub", "Kindle"],
      rating: 4.9,
      reviews: 215,
      author: "Ana Martínez",
      isPremium: true,
      price: "29€",
      featured: true
    },
    {
      id: 5,
      title: "Planificación financiera para familias separadas",
      category: "cursos",
      image: "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Curso práctico sobre cómo organizar las finanzas, compartir gastos y planificar el futuro económico tras la separación.",
      duration: "3 horas",
      lessons: 6,
      rating: 4.6,
      reviews: 78,
      instructor: "Elena Martín, Asesora financiera",
      isPremium: true,
      price: "59€",
      featured: false
    },
    {
      id: 6,
      title: "Webinar: Aspectos legales de la coparentalidad",
      category: "webinars",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Sesión informativa sobre los derechos y responsabilidades legales en la coparentalidad, con tiempo para preguntas y respuestas.",
      duration: "60 minutos",
      rating: 4.5,
      reviews: 42,
      presenter: "Roberto Herrera, Abogado de familia",
      isPremium: false,
      price: "Gratuito",
      featured: false
    },
    {
      id: 7,
      title: "Plantillas para seguimiento de gastos compartidos",
      category: "plantillas",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Hojas de cálculo y plantillas para el seguimiento y división equitativa de gastos relacionados con los hijos.",
      formats: ["Excel", "Google Sheets", "Numbers"],
      rating: 4.8,
      reviews: 63,
      author: "Javier López, Asesor financiero",
      isPremium: true,
      price: "19€",
      featured: false
    },
    {
      id: 8,
      title: "Guía para crear calendarios de custodia efectivos",
      category: "guias",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Aprende a crear calendarios de custodia que funcionen para todos los miembros de la familia, con ejemplos y plantillas.",
      pages: 45,
      formats: ["PDF"],
      rating: 4.7,
      reviews: 91,
      author: "Patricia Navarro, Mediadora familiar",
      isPremium: false,
      price: "Gratuito",
      featured: false
    }
  ];
  
  // Filtrar recursos según los criterios de búsqueda
  const filteredRecursos = recursos.filter(recurso => {
    const matchesSearch = searchTerm === "" || 
      recurso.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recurso.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === null || selectedCategory === "todos" || recurso.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Ordenar para mostrar primero los destacados
  const sortedRecursos = [...filteredRecursos].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <main className="min-h-screen">
      <NavbarHome />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Recursos educativos
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Cursos, plantillas, webinars y guías para mejorar tu experiencia de coparentalidad
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Buscar recursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Category Tabs */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-10">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
                  selectedCategory === category.id
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category.icon && <span className="mr-2">{category.icon}</span>}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Resources Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          {filteredRecursos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedRecursos.map((recurso) => (
                <motion.div
                  key={recurso.id}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-48">
                    <Image
                      src={recurso.image}
                      alt={recurso.title}
                      fill
                      className="object-cover"
                    />
                    {recurso.isPremium && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-md flex items-center">
                        <Lock className="h-3 w-3 mr-1" />
                        PREMIUM
                      </div>
                    )}
                    {recurso.featured && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                        DESTACADO
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="mb-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        recurso.category === 'cursos' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                        recurso.category === 'webinars' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        recurso.category === 'plantillas' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                      }`}>
                        {recurso.category === 'cursos' ? 'Curso' :
                         recurso.category === 'webinars' ? 'Webinar' :
                         recurso.category === 'plantillas' ? 'Plantilla' :
                         'Guía'}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{recurso.title}</h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">{recurso.description}</p>
                    
                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">{recurso.rating}</span>
                      <span className="mx-1 text-gray-500 dark:text-gray-400">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{recurso.reviews} reseñas</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {'duration' in recurso && (
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {recurso.duration}
                        </div>
                      )}
                      
                      {'lessons' in recurso && (
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {recurso.lessons} lecciones
                        </div>
                      )}
                      
                      {'pages' in recurso && (
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <FileText className="h-3 w-3 mr-1" />
                          {recurso.pages} páginas
                        </div>
                      )}
                      
                      {'instructor' in recurso && (
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Users className="h-3 w-3 mr-1" />
                          {recurso.instructor}
                        </div>
                      )}
                      
                      {'presenter' in recurso && (
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Users className="h-3 w-3 mr-1" />
                          {recurso.presenter}
                        </div>
                      )}
                      
                      {'author' in recurso && (
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Users className="h-3 w-3 mr-1" />
                          {recurso.author}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className={`font-bold ${recurso.isPremium ? 'text-gray-900 dark:text-white' : 'text-green-600 dark:text-green-400'}`}>
                        {recurso.price}
                      </span>
                      
                      <a
                        href={`/recursos/${recurso.id}`}
                        className={`py-2 px-4 rounded-md text-sm font-medium ${
                          recurso.isPremium
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        } transition-colors`}
                      >
                        {recurso.isPremium ? 'Comprar' : 'Acceder'}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-700 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 mb-4">No se encontraron recursos con los criterios seleccionados.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
                className="py-2 px-4 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Premium Subscription */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Accede a todos los recursos premium
              </h2>
              <p className="text-lg opacity-90 mb-6">
                Con una suscripción premium, tendrás acceso ilimitado a todos nuestros cursos, plantillas, webinars y guías exclusivas para mejorar tu experiencia de coparentalidad.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Acceso ilimitado a todos los recursos premium",
                  "Nuevos contenidos cada mes",
                  "Descarga de plantillas y guías en todos los formatos",
                  "Certificados de finalización para cursos",
                  "Acceso prioritario a webinars en vivo"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-yellow-300 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="opacity-90">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/pricing"
                  className="inline-block py-3 px-6 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Ver planes
                </a>
                <a 
                  href="/recursos/premium"
                  className="inline-block py-3 px-6 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
                >
                  Más información
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Lo que incluye Premium</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Biblioteca completa",
                      description: "Acceso a más de 50 recursos premium valorados en más de 1.500€"
                    },
                    {
                      title: "Actualizaciones constantes",
                      description: "Añadimos nuevo contenido cada semana basado en las últimas investigaciones"
                    },
                    {
                      title: "Soporte personalizado",
                      description: "Consultas ilimitadas con nuestro equipo de expertos en coparentalidad"
                    },
                    {
                      title: "Comunidad exclusiva",
                      description: "Acceso a nuestra comunidad privada de padres y profesionales"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
                          <Check className="h-3 w-3 text-blue-700" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">{item.title}</h4>
                        <p className="opacity-80 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                  <p className="text-sm opacity-80 mb-2">Desde solo</p>
                  <p className="text-4xl font-bold mb-2">19,99€<span className="text-lg font-normal">/mes</span></p>
                  <p className="text-sm opacity-80 mb-6">Facturado anualmente o 29,99€ facturado mensualmente</p>
                  <a 
                    href="/pricing"
                    className="block w-full py-3 px-6 bg-yellow-400 text-blue-800 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
                  >
                    Comenzar ahora
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <CTASection />
      <Footer />
    </main>
  );
} 