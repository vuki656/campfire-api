import { prisma } from '../../server'
import { UserType } from '../User/types'

import type {
    GroupArgs,
    GroupMembersArgs,
} from './args'
import type {
    CreateGroupInput,
    EditGroupInput,
    KickUserFromGroupInput,
} from './mutations/inputs'
import {
    CreateGroupPayload,
    EditGroupPayload,
    KickUserFromGroupPayload,
} from './mutations/payloads'
import { GroupType } from './types'

export class GroupService {

    public async findCreated(userId: string) {
        const groups = await prisma.group.findMany({
            include: {
                author: true,
            },
            where: {
                authorId: userId,
            },
        })

        return groups.map((group) => new GroupType(group))
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

        return groups.map((group) => new GroupType(group))
    }

    public async findOne(args: GroupArgs) {
        const group = await prisma.group.findUnique({
            include: {
                author: true,
                posts: {
                    include: {
                        author: true,
                        favoritedBy: {
                            select: {
                                userId: true,
                            },
                        },
                        metadata: true,
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

    public async findMembers(args: GroupMembersArgs) {
        const members = await prisma.user.findMany({
            where: {
                joinedGroups: {
                    some: {
                        id: args.groupId,
                    },
                },
            },
        })

        return members.map((member) => new UserType(member))
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

    public async kickUser(input: KickUserFromGroupInput) {
        const group = await prisma.group.update({
            data: {
                users: {
                    disconnect: {
                        id: input.userId,
                    },
                },
            },
            where: {
                id: input.groupId,
            },
        })

        return new KickUserFromGroupPayload(group)
    }

}
