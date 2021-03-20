import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server'

import { decodeToken } from '../lib/decodeToken'

import { getSchema } from './schema'

export const prisma = new PrismaClient()

const SECRET = process.env.JWT_SECRET as string

const server = new ApolloServer({
    context: ({ req }) => {
        const tokenPayload = req.headers.token as string
        // eslinv-disable-next-line @typescript-eslint/no-confusing-void-expression
        const decodedToken = decodeToken(tokenPayload)

        console.log(1)

        return {
            secret: SECRET,
            token: tokenPayload,
            userId: decodedToken.userId,
        }
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
