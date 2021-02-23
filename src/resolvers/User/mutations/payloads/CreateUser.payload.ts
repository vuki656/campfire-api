import {
    Field,
    ObjectType,
} from 'type-graphql'

import { UserType } from '../../types'

@ObjectType()
export class CreateUserPayload {

    @Field()
    user: UserType

    constructor(user: UserType) {
        this.user = user
    }

}
