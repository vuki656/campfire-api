import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server'
import { verify } from 'jsonwebtoken'

import { getSchema } from './schema'

export const prisma = new PrismaClient()

const SECRET = process.env.JWT_SECRET as string

const server = new ApolloServer({
    context: ({ req }) => {
        const tokenPayload = req.headers.token as string ?? ''
        const decodedToken: { userId: string } = { userId: '' }

        const [, token] = tokenPayload.split(' ')

        if (token) {
            verify(token, SECRET, (error, result) => {
                if (!error) {
                    // @ts-expect-error
                    decodedToken.userId = result?.userId as { userId: string }
                }
            })
        }

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
