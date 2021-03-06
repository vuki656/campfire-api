import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class CreatePostInput {

    @Field()
    description: string

    @Field()
    link: string

    @Field()
    groupId: string

}
