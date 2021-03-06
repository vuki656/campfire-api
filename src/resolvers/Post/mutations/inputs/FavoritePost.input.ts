import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class FavoritePostInput {

    @Field()
    postId: string

}
