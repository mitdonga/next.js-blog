import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({log: ['query', 'error', 'info', 'warn']})

export const UserType = typeof prisma.user
export default prisma;