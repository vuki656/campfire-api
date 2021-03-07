import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class DeleteInviteInput {

    @Field()
    groupId: string

    @Field()
    invitedUserId: string

}
