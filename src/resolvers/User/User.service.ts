import { UserInputError } from 'apollo-server'
import {
    compareSync,
    hash,
} from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import fetch from 'node-fetch'

import { prisma } from '../../server'
import type { ContextType } from '../../types'

import type {
    CreateUserInput,
    LogInUserInput,
} from './mutations/inputs'
import {
    CreateUserPayload,
    LogInUserPayload,
} from './mutations/payloads'
import type { UserArgs } from './queries/Args'
import { UserType } from './types'

export class UserService {

    public async findOne(args: UserArgs) {
        const user = await prisma.user.findUnique({ where: { id: args.id } })

        if (!user) {
            return null
        }

        return new UserType(user)
    }

    public async logIn(
        input: LogInUserInput,
        context: ContextType
    ) {
        const user = await prisma.user.findUnique({ where: { username: input.username } })

        if (!user) {
            throw new UserInputError('Invalid credentials')
        }

        const isPasswordValid = compareSync(input.password, user.password)

        if (!isPasswordValid) {
            throw new UserInputError('Invalid credentials')
        }

        const signedToken = sign(
            { username: user?.username },
            context.secret,
            { expiresIn: '7 days' }
        )

        return new LogInUserPayload(signedToken)
    }

    public async create(
        input: CreateUserInput,
        context: ContextType
    ) {
        const userExists = await prisma.user.findUnique({ where: { username: input.username } })

        if (userExists) {
            throw new UserInputError('Username already exists')
        }

        const passwordHash = await hash(input.password, 10)

        const imageURL = await fetch('https://dog.ceo/api/breeds/image/random')
            .then(async (responseJSON) => {
                const response = await responseJSON.json() as { message: string }

                return response.message
            })

        const user = await prisma.user.create({
            data: {
                imageURL: imageURL,
                password: passwordHash,
                username: input.username,
            },
        })

        const token = sign(
            { username: user.username },
            context.secret,
            { expiresIn: '7 days' }
        )

        return new CreateUserPayload(user, token)
    }

}
