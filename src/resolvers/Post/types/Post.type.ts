import {
    Field,
    ObjectType,
} from 'type-graphql'

import { GroupType } from '../../Group/types'
import { UserType } from '../../User/types'

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

    @Field(() => GroupType, { nullable: true })
    // eslint-disable-next-line type-graphql/invalid-nullable-output-type
    group? : GroupType | null

    constructor(post: PostType) {
        this.id = post.id
        this.description = post.description
        this.link = post.link
        this.author = post.author
        this.group = post.group
        this.createdAt = post.createdAt
    }

}
