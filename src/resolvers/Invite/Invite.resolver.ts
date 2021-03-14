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
    AcceptInviteInput,
    CreateInviteInput,
    DeclineInviteInput,
    DeleteInviteInput,
} from './mutations/inputs'
import {
    AcceptInvitePayload,
    CreateInvitePayload,
    DeclineInvitePayload,
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
        return this.service.findUserInvites(context.userId)
    }

    @Authorized()
    @Query(() => [InviteType])
    public async groupInvites(
        @Arg('args') args: GroupInvitesArgs
    ): Promise<InviteType[]> {
        return this.service.findGroupInvites(args)
    }

    @Authorized()
    @Mutation(() => CreateInvitePayload)
    public async creteUserInvite(
        @Arg('input') input: CreateInviteInput,
    ): Promise<CreateInvitePayload> {
        return this.service.createInvite(input)
    }

    @Authorized()
    @Mutation(() => AcceptInvitePayload)
    public async acceptInvite(
        @Arg('input') input: AcceptInviteInput,
        @Ctx() context: ContextType
    ): Promise<AcceptInvitePayload> {
        return this.service.acceptInvite(input, context.userId)
    }

    @Authorized()
    @Mutation(() => DeclineInvitePayload)
    public async declineInvite(
        @Arg('input') input: DeclineInviteInput
    ): Promise<DeclineInvitePayload> {
        return this.service.declineInvite(input)
    }

    @Authorized()
    @Mutation(() => DeleteInvitePayload)
    public async deleteInvite(
        @Arg('input') input: DeleteInviteInput
    ): Promise<DeleteInvitePayload> {
        return this.service.deleteInvite(input)
    }

}
