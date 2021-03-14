import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class KickUserFromGroupInput {

    @Field()
    userId: string

    @Field()
    groupId: string

}
