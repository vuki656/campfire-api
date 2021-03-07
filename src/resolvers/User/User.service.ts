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
import { LogInUserPayload } from './mutations/payloads'
import type { NonGroupMembersArgs } from './queries/args'
import { UserType } from './types'

export class UserService {

    public async findOne(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })

        if (!user) {
            return null
        }

        return new UserType(user)
    }

    public async findNonGroupMembers(args: NonGroupMembersArgs, userId: string) {
        const users = await prisma.user.findMany({
            where: {
                NOT: [
                    {
                        createdGroups: {
                            some: {
                                authorId: userId,
                            },
                        },
                    },
                    {
                        joinedGroups: {
                            some: {
                                id: args.groupId,
                            },
                        },
                    },
                    {
                        receivedInvites: {
                            some: {
                                groupId: args.groupId,
                            },
                        },
                    },
                ],
            },
        })

        return users.map((user) => new UserType(user))
    }

    public async logIn(
        input: LogInUserInput,
        context: ContextType
    ) {
        let user = await prisma.user.findUnique({ where: { username: input.username } })

        if (!user) {
            user = await this.create(input)
        } else {
            const isPasswordValid = compareSync(input.password, user.password)

            if (!isPasswordValid) {
                throw new UserInputError('Error', { password: 'Wrong password.' })
            }
        }

        const signedToken = sign(
            { userId: user?.id },
            context.secret,
            { expiresIn: '7 days' }
        )

        return new LogInUserPayload(signedToken)
    }

    public async create(input: CreateUserInput) {
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

        return new UserType(user)
    }

}
