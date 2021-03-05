import {
    Field,
    ObjectType,
} from 'type-graphql'

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

    constructor(group: GroupType) {
        this.id = group.id
        this.name = group.name
        this.createdAt = group.createdAt
        this.author = group.author
    }

}
