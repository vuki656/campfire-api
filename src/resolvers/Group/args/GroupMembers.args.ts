import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class GroupMembersArgs {

    @Field()
    groupId: string

}
