"use client";

import { NavbarHome } from "@/components/ui/navbar-home";
import { Footer } from "@/components/ui/footer";
import { CTASection } from "@/components/ui/cta-section";
import { motion } from "framer-motion";
import { Search, Filter, Star, MapPin, Clock, Briefcase, Users, Shield, Award, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const categories = [
    { id: "abogados", name: "Abogados de familia", icon: <Briefcase className="h-5 w-5" /> },
    { id: "mediadores", name: "Mediadores familiares", icon: <Users className="h-5 w-5" /> },
    { id: "psicologos", name: "Psicólogos infantiles", icon: <Shield className="h-5 w-5" /> },
    { id: "asesores", name: "Asesores financieros", icon: <Award className="h-5 w-5" /> }
  ];
  
  const locations = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Online"];
  
  const professionals = [
    {
      id: 1,
      name: "Ana García Martínez",
      category: "abogados",
      title: "Abogada especialista en derecho de familia",
      image: "https://randomuser.me/api/portraits/women/76.jpg",
      rating: 4.9,
      reviewCount: 124,
      location: "Madrid",
      price: "120€/hora",
      description: "Más de 15 años de experiencia en casos de custodia compartida y divorcios. Enfoque centrado en el bienestar de los niños y resolución amistosa de conflictos.",
      availability: "Disponible en 2-3 días",
      featured: true
    },
    {
      id: 2,
      name: "Carlos Rodríguez López",
      category: "mediadores",
      title: "Mediador familiar certificado",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      reviewCount: 98,
      location: "Barcelona",
      price: "90€/hora",
      description: "Especialista en mediación familiar con enfoque en comunicación efectiva y resolución de conflictos. Ayudo a las familias a encontrar soluciones colaborativas.",
      availability: "Disponible esta semana",
      featured: false
    },
    {
      id: 3,
      name: "Laura Sánchez Pérez",
      category: "psicologos",
      title: "Psicóloga infantil y adolescente",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5.0,
      reviewCount: 156,
      location: "Online",
      price: "80€/sesión",
      description: "Especializada en ayudar a niños y adolescentes a adaptarse a los cambios familiares. Ofrezco herramientas prácticas para padres e hijos.",
      availability: "Disponible mañana",
      featured: true
    },
    {
      id: 4,
      name: "Miguel Fernández Gómez",
      category: "abogados",
      title: "Abogado especialista en derecho de familia",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 4.7,
      reviewCount: 87,
      location: "Valencia",
      price: "110€/hora",
      description: "Especializado en casos complejos de custodia y régimen de visitas. Enfoque práctico y orientado a resultados.",
      availability: "Disponible la próxima semana",
      featured: false
    },
    {
      id: 5,
      name: "Elena Martín Díaz",
      category: "asesores",
      title: "Asesora financiera para familias",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      rating: 4.8,
      reviewCount: 64,
      location: "Sevilla",
      price: "100€/consulta",
      description: "Ayudo a familias a organizar sus finanzas tras la separación, incluyendo planificación de gastos compartidos y educación financiera.",
      availability: "Disponible en 3-4 días",
      featured: false
    },
    {
      id: 6,
      name: "Javier López Torres",
      category: "mediadores",
      title: "Mediador y coach familiar",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 4.9,
      reviewCount: 112,
      location: "Online",
      price: "95€/hora",
      description: "Combino mediación y coaching para ayudar a las familias a establecer una comunicación efectiva y patrones de coparentalidad saludables.",
      availability: "Disponible esta semana",
      featured: false
    },
    {
      id: 7,
      name: "Patricia Navarro Gil",
      category: "psicologos",
      title: "Psicóloga especialista en trauma infantil",
      image: "https://randomuser.me/api/portraits/women/62.jpg",
      rating: 4.9,
      reviewCount: 78,
      location: "Bilbao",
      price: "85€/sesión",
      description: "Especializada en ayudar a niños a procesar situaciones traumáticas relacionadas con la separación familiar y construir resiliencia.",
      availability: "Disponible mañana",
      featured: false
    },
    {
      id: 8,
      name: "Roberto Herrera Blanco",
      category: "asesores",
      title: "Asesor patrimonial y financiero",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4.7,
      reviewCount: 56,
      location: "Madrid",
      price: "130€/consulta",
      description: "Especializado en la división equitativa de bienes y planificación financiera post-divorcio. Enfoque en soluciones sostenibles a largo plazo.",
      availability: "Disponible en 1-2 días",
      featured: false
    }
  ];
  
  // Filtrar profesionales según los criterios de búsqueda
  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = searchTerm === "" || 
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === null || professional.category === selectedCategory;
    const matchesLocation = selectedLocation === null || professional.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });
  
  // Ordenar para mostrar primero los destacados
  const sortedProfessionals = [...filteredProfessionals].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <main className="min-h-screen">
      <NavbarHome />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Marketplace de profesionales
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Conecta con abogados, mediadores y psicólogos especializados en coparentalidad y familia
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Buscar por nombre, especialidad o palabras clave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filtros</h3>
                  <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Categoría</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedCategory === null
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      Todas las categorías
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center ${
                          selectedCategory === category.id
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Location Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Ubicación</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedLocation === null
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      Todas las ubicaciones
                    </button>
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => setSelectedLocation(location)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          selectedLocation === location
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(null);
                    setSelectedLocation(null);
                  }}
                  className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
            
            {/* Professional Cards */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {sortedProfessionals.length} profesionales encontrados
                </h2>
              </div>
              
              <div className="space-y-6">
                {sortedProfessionals.length > 0 ? (
                  sortedProfessionals.map((professional) => (
                    <motion.div
                      key={professional.id}
                      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border ${
                        professional.featured ? "border-blue-500 dark:border-blue-400" : "border-gray-200 dark:border-gray-700"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      {professional.featured && (
                        <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
                          Profesional destacado
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 mb-4 md:mb-0">
                            <div className="relative h-40 w-40 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700">
                              <Image
                                src={professional.image}
                                alt={professional.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          
                          <div className="md:w-3/4 md:pl-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{professional.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400">{professional.title}</p>
                              </div>
                              
                              <div className="mt-2 md:mt-0 flex items-center">
                                <div className="flex items-center mr-2">
                                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                  <span className="ml-1 font-semibold text-gray-900 dark:text-white">{professional.rating}</span>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">({professional.reviewCount} reseñas)</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{professional.description}</p>
                            
                            <div className="flex flex-wrap gap-4 mb-4">
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <MapPin className="h-4 w-4 mr-1" />
                                {professional.location}
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Clock className="h-4 w-4 mr-1" />
                                {professional.availability}
                              </div>
                              
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {professional.price}
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                              <a
                                href={`/marketplace/profile/${professional.id}`}
                                className="py-2 px-4 bg-white border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-center"
                              >
                                Ver perfil completo
                              </a>
                              
                              <a
                                href={`/marketplace/book/${professional.id}`}
                                className="py-2 px-4 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                              >
                                Reservar consulta
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">No se encontraron profesionales con los criterios seleccionados.</p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory(null);
                        setSelectedLocation(null);
                      }}
                      className="py-2 px-4 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Cómo funciona
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Conectar con profesionales cualificados nunca ha sido tan fácil
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Busca y filtra",
                description: "Encuentra profesionales que se adapten a tus necesidades específicas utilizando nuestros filtros avanzados."
              },
              {
                step: "2",
                title: "Compara perfiles",
                description: "Revisa perfiles detallados, calificaciones y reseñas de otros usuarios para tomar una decisión informada."
              },
              {
                step: "3",
                title: "Reserva y conecta",
                description: "Programa una consulta directamente a través de nuestra plataforma y paga de forma segura."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* For Professionals */}
      <section className="py-20 bg-blue-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                ¿Eres un profesional?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Únete a nuestra red de profesionales especializados en coparentalidad y familia. Conecta con clientes que necesitan exactamente tus servicios y haz crecer tu práctica profesional.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Perfil profesional destacado y personalizable",
                  "Sistema de reservas y pagos integrado",
                  "Herramientas para gestionar tus clientes",
                  "Visibilidad ante miles de familias",
                  "Comisiones competitivas"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="/marketplace/join-as-professional"
                className="inline-block py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Unirse como profesional
              </a>
            </motion.div>
            
            <motion.div 
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Image 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Profesionales trabajando"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      <CTASection />
      <Footer />
    </main>
  );
} 