import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class CreateInviteInput {

    @Field()
    fromUserId: string

    @Field()
    toUserId: string

    @Field()
    groupId: string

}
