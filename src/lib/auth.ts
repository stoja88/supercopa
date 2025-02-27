import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export type UserRole = "ADMIN" | "USER" | "MEDIADOR"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Credenciales incompletas");
          throw new Error("Credenciales incompletas");
        }

        try {
          // Conectar a la base de datos
          const db = await getDynamicPrismaClient();

          // Buscar usuario por email
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            console.error(`Usuario no encontrado: ${credentials.email}`);
            throw new Error("Credenciales inválidas");
          }

          // Verificar contraseña
          const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword || "");

          if (!passwordMatch) {
            console.error("Contraseña incorrecta");
            throw new Error("Credenciales inválidas");
          }

          console.log("Usuario autenticado correctamente:", {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          });

          // Devolver usuario sin contraseña
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
          };
        } catch (error) {
          console.error("Error en authorize:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Inicial acceso: Añadir usuario al token
      if (user) {
        console.log("JWT callback - user added to token:", user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.picture = user.image;
      }

      // Para actualizaciones de perfil, podríamos refrescar el token aquí

      return token;
    },
    
    async session({ session, token, user }) {
      if (token) {
        console.log("Session callback - token added to session:", token);
        
        // Añadir información del token a la sesión
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role as string;
        session.user.image = token.picture as string | null;
      }

      return session;
    },
    
    async redirect({ url, baseUrl }) {
      // Redirigir a los usuarios según su rol después del inicio de sesión
      if (url.startsWith("/dashboard") || url === "/dashboard") {
        return baseUrl + "/dashboard";
      }
      
      // Redirecciones predeterminadas
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

// Función para verificar si un usuario está autenticado en el cliente
export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  
  const storedSession = localStorage.getItem("userSession");
  const sessionExpiry = localStorage.getItem("sessionExpiry");
  
  if (!storedSession || !sessionExpiry) return false;
  
  // Verificar si la sesión ha expirado
  const expiryDate = new Date(sessionExpiry);
  if (expiryDate < new Date()) {
    localStorage.removeItem("userSession");
    localStorage.removeItem("sessionExpiry");
    return false;
  }
  
  return true;
};

// Función para obtener el rol del usuario actual
export const getCurrentUserRole = () => {
  if (typeof window === "undefined") return null;
  
  const storedSession = localStorage.getItem("userSession");
  if (!storedSession) return null;
  
  try {
    const session = JSON.parse(storedSession);
    return session.user?.role || null;
  } catch (error) {
    console.error("Error al obtener el rol del usuario:", error);
    return null;
  }
};

// Tipos para extender las sesiones de NextAuth
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
} 