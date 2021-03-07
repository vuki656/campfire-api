import { prisma } from '../../server'

import type { GroupInvitesArgs } from './args'
import type {
    CreateInviteInput,
    DeleteInviteInput,
} from './mutations/inputs'
import {
    CreateInvitePayload,
    DeleteInvitePayload,
} from './mutations/payloads'
import { InviteType } from './types'

export class InviteService {

    public async userInvites(userId: string) {
        const invites = await prisma.invite.findMany({
            select: {
                fromUser: true,
                group: { // you just need the name here
                    include: {
                        author: true,
                    },
                },
                toUser: true,
            },
            where: {
                toUser: {
                    id: userId,
                },
            },
        })

        return invites.map((invite) => new InviteType(invite))
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

    public async createInvite(input: CreateInviteInput) {
        const invite = await prisma.invite.create({
            data: {
                fromUserId: input.fromUserId,
                groupId: input.groupId,
                toUserId: input.toUserId,
            },
            include: {
                fromUser: true,
                toUser: true,
            },
        })

        return new CreateInvitePayload(invite)
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
