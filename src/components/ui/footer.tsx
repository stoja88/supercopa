"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Producto",
      links: [
        { name: "Características", href: "/features" },
        { name: "Precios", href: "/pricing" },
        { name: "Testimonios", href: "/#testimonios" },
        { name: "Guías", href: "/guides" },
        { name: "Ayuda", href: "/help" }
      ]
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre nosotros", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Carreras", href: "/careers" },
        { name: "Contacto", href: "/contact" },
        { name: "Prensa", href: "/press" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Términos de servicio", href: "/terms" },
        { name: "Política de privacidad", href: "/privacy" },
        { name: "Cookies", href: "/cookies" },
        { name: "Licencias", href: "/licenses" },
        { name: "Seguridad", href: "/security" }
      ]
    },
    {
      title: "Recursos",
      links: [
        { name: "Documentación", href: "/docs" },
        { name: "Comunidad", href: "/community" },
        { name: "Webinars", href: "/webinars" },
        { name: "Socios", href: "/partners" },
        { name: "API", href: "/api" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com" },
    { name: "GitHub", icon: <Github className="h-5 w-5" />, href: "https://github.com" }
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CoParent
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Simplificando la co-parentalidad con herramientas intuitivas para una mejor comunicación, coordinación y colaboración entre padres separados.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} CoParent. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Términos
              </Link>
              <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacidad
              </Link>
              <Link href="/cookies" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Cookies
              </Link>
              <Link href="/sitemap" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Mapa del sitio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 