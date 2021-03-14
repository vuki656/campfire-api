import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class LogInUserPayload {

    @Field()
    userId: string

    @Field()
    token: string

    constructor(userId: string, token: string) {
        this.token = token
        this.userId = userId
    }

}
