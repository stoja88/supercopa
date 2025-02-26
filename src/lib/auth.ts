import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

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
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciales incompletas");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Usuario no encontrado");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Contraseña incorrecta");
        }

        // Registrar el inicio de sesión
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            updatedAt: new Date(),
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // Establecer una expiración más larga
        token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 días
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
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
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 días
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
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