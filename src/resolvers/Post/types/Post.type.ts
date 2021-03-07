import {
    Field,
    ObjectType,
} from 'type-graphql'

import { GroupType } from '../../Group/types'
import { UserType } from '../../User/types'

import { FavoriteType } from './Favorite.type'
import { PostMetadataType } from './PostMetadata.type'

@ObjectType()
export class PostType {

    @Field()
    id: string

    @Field(() => String, { nullable: true })
    description: string | null

    @Field()
    link: string

    @Field()
    createdAt: Date

    @Field()
    author: UserType

    @Field(() => PostMetadataType, { nullable: true })
    metadata?: PostMetadataType | null

    @Field(() => [FavoriteType], { nullable: true })
    favoritedBy?: FavoriteType[] | null

    @Field(() => GroupType, { nullable: true })
    group? : GroupType | null

    constructor(post: PostType) {
        this.id = post.id
        this.description = post.description
        this.link = post.link
        this.createdAt = post.createdAt
        this.author = post.author
        this.metadata = post.metadata
        this.favoritedBy = post.favoritedBy
        this.group = post.group
    }

}
