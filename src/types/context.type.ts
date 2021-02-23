import type { PrismaClient } from '@prisma/client'

export type ContextType = {
    token: string
    secret: string
    prisma: PrismaClient
}
