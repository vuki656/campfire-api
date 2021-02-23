import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { ContextType } from '../../types'

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
    ): Promise<UserType | null> {
        return this.service.findOne(args)
    }

    @Mutation(() => CreateUserPayload)
    public async createUser(
        @Arg('input') input: CreateUserInput,
        @Ctx() context: ContextType
    ): Promise<CreateUserPayload> {
        return this.service.create(input, context)
    }

}
