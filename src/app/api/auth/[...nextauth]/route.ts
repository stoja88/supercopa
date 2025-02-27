import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

console.log("Inicializando NextAuth con las siguientes opciones:", {
  providers: authOptions.providers.map(p => p.id),
  session: authOptions.session?.strategy || 'default',
  pages: authOptions.pages,
  debug: authOptions.debug
});

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 