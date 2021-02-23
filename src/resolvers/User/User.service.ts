import { prisma } from '../../server'

import type { CreateUserInput } from './mutations/inputs'
import { CreateUserPayload } from './mutations/payloads'
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

    public async create(input: CreateUserInput) {
        const user = await prisma.user.create({
            data: {
                imageURL: input.imageURL,
                username: input.username,
            },
        })

        return new CreateUserPayload(user)
    }

}
