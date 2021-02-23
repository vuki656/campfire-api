import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class UserArgs {

    @Field()
    id: string

}
