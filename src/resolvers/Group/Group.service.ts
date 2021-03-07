import type { ContextType } from 'src/types'

import { prisma } from '../../server'
import { InviteType } from '../User/types'

import type {
    GroupArgs,
    GroupInvitesArgs,
} from './args'
import type {
    CreateGroupInput,
    DeleteInviteInput,
    EditGroupInput,
} from './mutations/inputs'
import {
    CreateGroupPayload,
    EditGroupPayload,
} from './mutations/payloads'
import { DeleteInvitePayload } from './mutations/payloads/DeleteInvite.payload'
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

    public async findInvites(args: GroupInvitesArgs) {
        const invites = await prisma.invite.findMany({
            select: {
                fromUser: true,
                toUser: true,
            },
            where: {
                groupId: args.groupId,
            },
        })

        return invites.map((invite) => {
            return new InviteType(invite)
        })
    }

    public async deleteInvite(input: DeleteInviteInput) {
        const invite = await prisma.invite.delete({
            include: {
                fromUser: true,
                toUser: true,
            },
            where: {
                toUserId_groupId: {
                    groupId: input.groupId,
                    toUserId: input.invitedUserId,
                },
            },
        })

        return new DeleteInvitePayload(invite)
    }

}
