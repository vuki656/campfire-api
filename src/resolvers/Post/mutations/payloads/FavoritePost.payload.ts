import {
    Field,
    ObjectType,
} from 'type-graphql'

import { PostType } from '../../types'

@ObjectType()
export class FavoritePostPayload {

    @Field()
    post: PostType

    constructor(post: PostType) {
        this.post = post
    }

}
