import type { ContextType } from 'src/types'

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
                posts: {
                    include: {
                        author: true,
                    },
                },
            },
        })

        return new CreateGroupPayload(group)
    }

    public async edit(input: EditGroupInput) {
        const group = await prisma.group.update({
            data: {
                name: input.name,
            },
            include: {
                author: true,
            },
            where: {
                id: input.id,
            },
        })

        return new EditGroupPayload(group)
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

    public async findJoined(userId: string) {
        const groups = await prisma.group.findMany({
            include: {
                author: true,
            },
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
        })

        return groups.map((group) => {
            return new GroupType(group)
        })
    }

    public async findOne(args: GroupArgs, context: ContextType) {
        const group = await prisma.group.findUnique({
            include: {
                author: true,
                posts: {
                    include: {
                        author: true,
                    },
                    orderBy: {
                        createdAt: 'asc',
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

}
