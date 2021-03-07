import { prisma } from '../../server'

import type { GroupArgs } from './args'
import type {
    CreateGroupInput,
    EditGroupInput,
} from './mutations/inputs'
import {
    CreateGroupPayload,
    EditGroupPayload,
} from './mutations/payloads'
import { GroupType } from './types'

export class GroupService {

    public async findCreated(userId: string) {
        const groups = await prisma.group.findMany({
            where: {
                authorId: userId,
            },
        })

        return groups.map((group) => new GroupType(group))
    }

    public async findJoined(userId: string) {
        const groups = await prisma.group.findMany({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
        })

        return groups.map((group) => new GroupType(group))
    }

    public async findOne(args: GroupArgs) {
        const group = await prisma.group.findUnique({
            include: {
                posts: {
                    include: {
                        author: true,
                        metadata: true,
                        favoritedBy: {
                            select: {
                                userId: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
            where: {
                id: args.groupId,
            },
        })

        if (!group) {
            return null
        }

        return new GroupType(group)
    }

    public async create(
        input: CreateGroupInput,
        userId: string
    ) {
        const group = await prisma.group.create({
            data: {
                authorId: userId,
                name: input.name,
            },
        })

        return new CreateGroupPayload(group)
    }

    public async edit(input: EditGroupInput) {
        const group = await prisma.group.update({
            data: {
                name: input.name,
            },
            where: {
                id: input.id,
            },
        })

        return new EditGroupPayload(group)
    }

}
