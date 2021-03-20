import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server'

import { getUserIdFromToken } from '../lib/getUserIdFromToken'
import type { ContextType } from '../types'

import { getSchema } from './schema'

export const prisma = new PrismaClient()

const SECRET = process.env.JWT_SECRET as string

const server = new ApolloServer({
    context: ({ req }) => {
        const tokenPayload = req.headers.token as string

        return {
            secret: SECRET,
            tokenPayload: tokenPayload,
            userId: getUserIdFromToken(tokenPayload),
        } as ContextType
    },
    playground: true,
    schema: getSchema(),
})

export const startServer = (): void => {
    const port = 8080

    server
        .listen({ port: port })
        .then(() => {
            // eslint-disable-next-line no-console
            console.log(`======== UP ON ${port} ========`)
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
        })
}
