import {
    Field,
    ObjectType,
} from 'type-graphql'

import { PostType } from '../../Post/types'
import { UserType } from '../../User/types'

@ObjectType()
export class GroupType {

    @Field()
    id: string

    @Field()
    name: string

    @Field()
    createdAt: Date

    @Field()
    author: UserType

    @Field(() => [PostType], { nullable: true })
    // eslint-disable-next-line type-graphql/invalid-nullable-output-type
    posts?: PostType[] | null

    constructor(group: GroupType) {
        this.id = group.id
        this.name = group.name
        this.createdAt = group.createdAt
        this.author = group.author
        this.posts = group.posts
    }

}
