import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class CreateGroupInput {

    @Field()
    name: string

}
