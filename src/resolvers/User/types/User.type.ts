import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class UserType {

    @Field()
    id: string

    @Field()
    username: string

    @Field()
    imageURL: string

    constructor(user: UserType) {
        this.id = user.id
        this.username = user.username
        this.imageURL = user.imageURL
    }

}
