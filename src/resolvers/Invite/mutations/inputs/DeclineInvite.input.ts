import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class DeclineInviteInput {

    @Field()
    inviteId: string

}
