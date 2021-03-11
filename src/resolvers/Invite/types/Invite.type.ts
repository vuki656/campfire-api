import {
    Field,
    ObjectType,
} from 'type-graphql'

import { GroupType } from '../../Group/types'
import { UserType } from '../../User/types'

@ObjectType()
export class InviteType {

    @Field()
    id: string

    @Field()
    fromUser: UserType

    @Field()
    toUser: UserType

    @Field(() => GroupType, { nullable: true })
    group?: GroupType

    constructor(invite: InviteType) {
        this.id = invite.id
        this.toUser = invite.toUser
        this.fromUser = invite.fromUser
        this.group = invite.group
    }
}
