// Este archivo es un alias para redirigir las importaciones antiguas
// a la nueva estructura en db.ts

import prisma, { db, getDynamicPrismaClient } from "./db";

export { db, getDynamicPrismaClient };
export default prisma; 