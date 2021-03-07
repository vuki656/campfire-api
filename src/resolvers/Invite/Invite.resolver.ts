import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { InviteService } from '.'

import { ContextType } from '../../types'

import { GroupInvitesArgs } from './args'
import {
    CreateInviteInput,
    DeleteInviteInput,
} from './mutations/inputs'
import {
    CreateInvitePayload,
    DeleteInvitePayload,
} from './mutations/payloads'
import { InviteType } from './types'

@Resolver(() => InviteType)
export class InviteResolver {

    private readonly service: InviteService

    constructor() {
        this.service = new InviteService()
    }

    @Authorized()
    @Query(() => [InviteType])
    public async userInvites(
        @Ctx() context: ContextType
    ): Promise<InviteType[]> {
        return this.service.userInvites(context.userId)
    }

    @Authorized()
    @Query(() => [InviteType])
    public async groupInvites(
        @Arg('args') args: GroupInvitesArgs
    ): Promise<InviteType[]> {
        return this.service.findInvites(args)
    }

    @Authorized()
    @Mutation(() => CreateInvitePayload)
    public async creteUserInvite(
        @Arg('input') input: CreateInviteInput,
    ): Promise<CreateInvitePayload> {
        return this.service.createInvite(input)
    }

    @Authorized()
    @Mutation(() => DeleteInvitePayload)
    public async deleteInvite(
        @Arg('input') input: DeleteInviteInput
    ): Promise<DeleteInvitePayload> {
        return this.service.deleteInvite(input)
    }

}
