import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class NonGroupMembersArgs {

    @Field()
    groupId: string

}
