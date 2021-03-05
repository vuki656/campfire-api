import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class EditGroupInput {

    @Field()
    id: string

    @Field()
    name: string

}
