import { prisma } from '../../server'
import { InviteType } from '../User/types'

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

}
