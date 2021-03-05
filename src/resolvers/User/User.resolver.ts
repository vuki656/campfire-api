import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { ContextType } from '../../types'

import { LogInUserInput } from './mutations/inputs'
import { LogInUserPayload } from './mutations/payloads'
import { UserType } from './types'
import { UserService } from './User.service'

@Resolver(() => UserType)
export class UserResolver {

    private readonly service: UserService

    constructor() {
        this.service = new UserService()
    }

    @Authorized()
    @Query(() => UserType, { nullable: true })
    public async user(
        @Ctx() context: ContextType,
    ): Promise<UserType | null> {
        return this.service.findOne(context.userId)
    }

    @Mutation(() => LogInUserPayload)
    public async logInUser(
        @Arg('input') input: LogInUserInput,
        @Ctx() context: ContextType,
    ): Promise<LogInUserPayload> {
        return this.service.logIn(input, context)
    }

}
