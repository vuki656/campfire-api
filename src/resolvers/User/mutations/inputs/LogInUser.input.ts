import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class LogInUserInput {

    @Field()
    username: string

    @Field()
    password: string

}
