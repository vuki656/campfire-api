import {
    Field,
    ObjectType,
} from 'type-graphql'

import { UserType } from '../../../User/types'

@ObjectType()
export class AcceptInvitePayload {

    @Field()
    user: UserType

    constructor(user: UserType) {
        this.user = user
    }

}
