import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class GroupArgs {

    @Field()
    groupId: string

}
