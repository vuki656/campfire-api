import {
    Field,
    ObjectType,
} from 'type-graphql'

import { UserType } from '../../types'

@ObjectType()
export class CreateUserPayload {

    @Field()
    user: UserType

    @Field()
    token: string

    constructor(
        user: UserType,
        token: string
    ) {
        this.user = user
        this.token = token
    }

}
