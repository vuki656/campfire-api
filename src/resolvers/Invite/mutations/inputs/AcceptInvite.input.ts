import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class AcceptInviteInput {

    @Field()
    groupId: string

    @Field()
    inviteId: string

}
