import {
    Field,
    ObjectType,
} from 'type-graphql'

import { GroupType } from '../../Group/types'

import { UserType } from './User.type'

@ObjectType()
export class InviteType {

    @Field()
    fromUser: UserType

    @Field()
    toUser: UserType

    @Field(() => GroupType, { nullable: true })
    group?: GroupType

    constructor(invite: InviteType) {
        this.toUser = invite.toUser
        this.fromUser = invite.fromUser
    }

}
