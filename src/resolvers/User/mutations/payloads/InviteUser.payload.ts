import {
    Field,
    ObjectType,
} from 'type-graphql'

import { InviteType } from '../../types'

@ObjectType()
export class InviteUserPayload {

    @Field()
    invite: InviteType

    constructor(invite: InviteType) {
        this.invite = invite
    }

}
