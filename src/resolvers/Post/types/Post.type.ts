import {
    Field,
    ObjectType,
} from 'type-graphql'

import { GroupType } from '../../Group/types'
import { UserType } from '../../User/types'

import { FavoriteType } from './Favorite.type'

@ObjectType()
export class PostType {

    @Field()
    id: string

    @Field(() => String, { nullable: true })
    description: string | null

    @Field()
    createdAt: Date

    @Field()
    link: string

    @Field(() => String, { nullable: true })
    title: string | null

    @Field(() => String, { nullable: true })
    siteName: string | null

    @Field(() => String, { nullable: true })
    imageLink: string | null

    @Field(() => String, { nullable: true })
    faviconLink: string | null

    @Field()
    author: UserType

    @Field(() => [FavoriteType], { nullable: true })
    favoritedBy?: FavoriteType[] | null

    @Field(() => GroupType, { nullable: true })
    group? : GroupType | null

    constructor(post: PostType) {
        this.id = post.id
        this.description = post.description
        this.link = post.link
        this.author = post.author
        this.group = post.group
        this.siteName = post.siteName
        this.imageLink = post.imageLink
        this.favoritedBy = post.favoritedBy
        this.createdAt = post.createdAt
    }

}
