import {
    Field,
    ObjectType,
} from 'type-graphql'

import { InviteType } from '../../../User/types'

@ObjectType()
export class DeleteInvitePayload {

    @Field()
    invite: InviteType

    constructor(invite: InviteType) {
        this.invite = invite
    }

}
