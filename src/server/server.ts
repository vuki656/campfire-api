import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server'

import { getSchema } from './schema'

export const prisma = new PrismaClient()

// TODO: DECODE USER ID FROM TOKEN AND PUT IN IN CONTEXT
const server = new ApolloServer({
    context: ({ req }) => {
        return {
            secret: process.env.JWT_SECRET,
            token: req.headers.token,
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
