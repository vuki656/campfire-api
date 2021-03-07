import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class InviteUserInput {

    @Field()
    fromUserId: string

    @Field()
    toUserId: string

    @Field()
    groupId: string

}
