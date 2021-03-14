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

    // This shouldn't be exposed with a field, its here for usage with internal logic only
    password: string

    constructor(user: UserType) {
        this.id = user.id
        this.username = user.username
        this.imageURL = user.imageURL
    }

}
