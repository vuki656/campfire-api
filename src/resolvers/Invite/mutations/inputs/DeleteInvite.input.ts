import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class DeleteInviteInput {

    @Field()
    inviteId: string

}
