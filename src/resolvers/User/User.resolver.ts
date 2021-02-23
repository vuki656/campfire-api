import {
    Arg,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { CreateUserInput } from './mutations/inputs'
import { CreateUserPayload } from './mutations/payloads'
import { UserArgs } from './queries/Args'
import { UserType } from './types'
import { UserService } from './User.service'

@Resolver(() => UserType)
export class UserResolver {

    private readonly service: UserService

    constructor() {
        this.service = new UserService()
    }

    @Query(() => UserType, { nullable: true })
    public async user(
        @Arg('args') args: UserArgs
    ) {
        return this.service.findOne(args)
    }

    @Mutation(() => CreateUserPayload)
    public async createUser(
        @Arg('input') input: CreateUserInput
    ) {
        return this.service.create(input)
    }

}
