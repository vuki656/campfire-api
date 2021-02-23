import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class LogInUserPayload {

    @Field()
    token: string

    constructor(token: string) {
        this.token = token
    }

}
