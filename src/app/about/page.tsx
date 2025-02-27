"use client";

import { NavbarHome } from "@/components/ui/navbar-home";
import { CTASection } from "@/components/ui/cta-section";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Users, Heart, Shield, Award, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const teamMembers = [
    {
      name: "Ana Martínez",
      role: "Fundadora y CEO",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      bio: "Ana fundó Coparentalidad después de experimentar de primera mano los desafíos de la crianza compartida. Con más de 15 años de experiencia en tecnología, está comprometida a crear herramientas que ayuden a las familias a prosperar."
    },
    {
      name: "Carlos Sánchez",
      role: "Director de Tecnología",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      bio: "Con experiencia en empresas como Google y Microsoft, Carlos lidera nuestro equipo de desarrollo para crear una plataforma segura, intuitiva y eficiente para todas las familias."
    },
    {
      name: "Laura Gómez",
      role: "Psicóloga Familiar",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      bio: "Laura aporta más de 20 años de experiencia en psicología familiar y mediación. Asesora en el desarrollo de funcionalidades que promueven la comunicación saludable y el bienestar de los niños."
    },
    {
      name: "Miguel Rodríguez",
      role: "Director de Experiencia de Usuario",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Miguel se asegura de que nuestra plataforma sea accesible e intuitiva para todos los usuarios, independientemente de su nivel de habilidad tecnológica."
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Centrados en los niños",
      description: "Creemos que el bienestar de los niños debe ser siempre la prioridad. Todas nuestras funcionalidades están diseñadas para fomentar un entorno estable y amoroso para ellos."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Comunicación respetuosa",
      description: "Promovemos una comunicación clara, respetuosa y efectiva entre los padres, lo que conduce a mejores resultados para toda la familia."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Privacidad y seguridad",
      description: "Protegemos la información de tu familia con los más altos estándares de seguridad y privacidad, para que puedas centrarte en lo que realmente importa."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-500" />,
      title: "Excelencia e innovación",
      description: "Nos esforzamos constantemente por mejorar nuestra plataforma, incorporando las últimas tecnologías y las mejores prácticas en coparentalidad."
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Fundación",
      description: "Coparentalidad nace como una idea para resolver los problemas de comunicación en familias separadas."
    },
    {
      year: "2019",
      title: "Lanzamiento Beta",
      description: "Lanzamos nuestra primera versión beta con funcionalidades básicas de calendario y mensajería."
    },
    {
      year: "2020",
      title: "Primera ronda de financiación",
      description: "Conseguimos nuestra primera ronda de financiación para expandir el equipo y mejorar la plataforma."
    },
    {
      year: "2021",
      title: "Expansión internacional",
      description: "Comenzamos nuestra expansión a mercados internacionales, traduciendo la plataforma a múltiples idiomas."
    },
    {
      year: "2022",
      title: "Lanzamiento de aplicaciones móviles",
      description: "Lanzamos nuestras aplicaciones nativas para iOS y Android, mejorando la accesibilidad."
    },
    {
      year: "2023",
      title: "1 millón de usuarios",
      description: "Alcanzamos el hito de 1 millón de usuarios activos en nuestra plataforma."
    }
  ];

  return (
    <main className="min-h-screen">
      <NavbarHome />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Nuestra misión es ayudar a las familias a prosperar
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Creamos herramientas que facilitan la coparentalidad, mejoran la comunicación y priorizan el bienestar de los niños.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Nuestra historia
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Coparentalidad nació de una necesidad personal. Nuestra fundadora, Ana Martínez, experimentó de primera mano los desafíos de coordinar la crianza de sus hijos después de su divorcio. La falta de herramientas adecuadas para gestionar calendarios, gastos y comunicación la llevó a crear una solución.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Lo que comenzó como un proyecto personal en 2018 rápidamente se convirtió en una plataforma completa diseñada para abordar los desafíos únicos que enfrentan las familias en situación de coparentalidad.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Hoy, Coparentalidad ayuda a miles de familias en todo el mundo a gestionar mejor sus responsabilidades compartidas, reducir conflictos y crear un entorno más estable y armonioso para sus hijos.
              </p>
            </motion.div>
            
            <motion.div 
              className="relative h-[500px] rounded-lg overflow-hidden shadow-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Image 
                src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Familia feliz"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Nuestros valores
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Estos principios guían todo lo que hacemos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mr-6 mt-1">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Nuestro equipo
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Personas apasionadas por mejorar la vida de las familias
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-64">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Milestones */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Nuestro camino
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los hitos que han marcado nuestra trayectoria
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  className="relative pl-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                  
                  {/* Timeline line */}
                  {index < milestones.length - 1 && (
                    <div className="absolute left-3 top-6 w-px h-24 bg-blue-200 dark:bg-blue-800"></div>
                  )}
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium mb-4">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "1M+", label: "Usuarios activos" },
              { number: "50+", label: "Países" },
              { number: "4.8/5", label: "Valoración media" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.number}</p>
                <p className="text-xl text-gray-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recognition */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Reconocimientos
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Orgullosos de ser reconocidos por nuestro impacto
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                award: "Premio a la Innovación Social 2022",
                organization: "Fundación Tecnología y Sociedad",
                description: "Reconocimiento a soluciones tecnológicas con impacto social positivo."
              },
              {
                award: "Mejor App para Familias 2023",
                organization: "Asociación de Aplicaciones Familiares",
                description: "Destacada por su facilidad de uso y funcionalidades centradas en el bienestar familiar."
              },
              {
                award: "Top 10 Startups con Propósito",
                organization: "Revista Emprendedores",
                description: "Seleccionada entre las startups que combinan éxito empresarial con impacto social."
              },
              {
                award: "Premio a la Excelencia en UX",
                organization: "Conferencia de Diseño Digital",
                description: "Reconocimiento al diseño centrado en el usuario y la accesibilidad."
              }
            ].map((award, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{award.award}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{award.organization}</p>
                    <p className="text-gray-600 dark:text-gray-300">{award.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <CTASection />
      <Footer />
    </main>
  );
} 