import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { ContextType } from '../../types'

import {
    InviteUserInput,
    LogInUserInput,
} from './mutations/inputs'
import {
    InviteUserPayload,
    LogInUserPayload,
} from './mutations/payloads'
import { NonGroupMembersArgs } from './queries/args'
import { UserType } from './types'
import { UserService } from './User.service'

@Resolver(() => UserType)
export class UserResolver {

    private readonly service: UserService

    constructor() {
        this.service = new UserService()
    }

    @Mutation(() => LogInUserPayload)
    public async logInUser(
        @Arg('input') input: LogInUserInput,
        @Ctx() context: ContextType,
    ): Promise<LogInUserPayload> {
        return this.service.logIn(input, context)
    }

    @Authorized()
    @Mutation(() => InviteUserPayload)
    public async inviteUser(
        @Arg('input') input: InviteUserInput,
    ): Promise<InviteUserPayload> {
        return this.service.inviteUser(input)
    }

    @Authorized()
    @Query(() => UserType, { nullable: true })
    public async user(
        @Ctx() context: ContextType,
    ): Promise<UserType | null> {
        return this.service.findOne(context.userId)
    }

    @Authorized()
    @Query(() => [UserType])
    public async nonGroupMembers(
       @Arg('args') args: NonGroupMembersArgs,
       @Ctx() context: ContextType,
    ): Promise<UserType[]> {
        return this.service.nonGroupMembers(args, context.userId)
    }

}
