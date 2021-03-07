import {
    Field,
    ObjectType,
} from 'type-graphql'

import { UserType } from './User.type'

@ObjectType()
export class InviteType {

    @Field()
    fromUser: UserType

    @Field()
    toUser: UserType

    constructor(invite: InviteType) {
        this.fromUser = invite.fromUser
        this.toUser = invite.toUser
    }

}
