import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class FavoriteType {

    @Field()
    userId: string

}
