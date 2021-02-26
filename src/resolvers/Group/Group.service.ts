import { prisma } from 'src/server'
import type { ContextType } from 'src/types'

import type { CreateGroupInput } from './mutations/inputs'
import { CreateGroupPayload } from './mutations/payloads'
import { GroupType } from './types'

export class GroupService {

    public async create(
        input: CreateGroupInput,
        context: ContextType
    ) {
        const group = await prisma.group.create({
            data: {
                authorId: context.userId,
                name: input.name,
            },
            include: {
                author: true,
            },
        })

        return new CreateGroupPayload(group)
    }

    public async findAll(userId: string) {
        const groups = await prisma.group.findMany({
            include: {
                author: true,
            },
            where: {
                authorId: userId,
            },
        })

        return groups.map((group) => {
            return new GroupType(group)
        })
    }

}
