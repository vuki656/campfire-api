import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class GroupInvitesArgs {

    @Field()
    groupId: string

}
