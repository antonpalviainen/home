import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  const g = global as unknown as { prisma?: PrismaClient }

  if (!g.prisma) {
    g.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    })
  }

  prisma = g.prisma
}

export default prisma
