import { ContextType } from 'src/types'
import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { GroupService } from '.'

import { InviteType } from '../User/types'

import {
    GroupArgs,
    GroupInvitesArgs,
} from './args'
import {
    CreateGroupInput,
    DeleteInviteInput,
    EditGroupInput,
} from './mutations/inputs'
import {
    CreateGroupPayload,
    EditGroupPayload,
} from './mutations/payloads'
import { DeleteInvitePayload } from './mutations/payloads/DeleteInvite.payload'
import { GroupType } from './types'

@Resolver(() => GroupType)
export class GroupResolver {

    private readonly service: GroupService

    constructor() {
        this.service = new GroupService()
    }

    @Authorized()
    @Query(() => GroupType, { nullable: true })
    public async group(
        @Arg('args') args: GroupArgs,
    ): Promise<GroupType | null> {
        return this.service.findOne(args)
    }

    @Authorized()
    @Mutation(() => CreateGroupPayload)
    public async createGroup(
        @Arg('input') input: CreateGroupInput,
        @Ctx() context: ContextType
    ): Promise<CreateGroupPayload> {
        return this.service.create(input, context)
    }

    @Authorized()
    @Mutation(() => EditGroupPayload)
    public async editGroup(
        @Arg('input') input: EditGroupInput,
    ): Promise<EditGroupPayload> {
        return this.service.edit(input)
    }

    @Authorized()
    @Query(() => [GroupType])
    public async userGroups(
        @Ctx() context: ContextType
    ): Promise<GroupType[]> {
        return this.service.findAll(context.userId)
    }

    @Authorized()
    @Query(() => [GroupType])
    public async userJoinedGroups(
        @Ctx() context: ContextType
    ): Promise<GroupType[]> {
        return this.service.findJoined(context.userId)
    }

    @Authorized()
    @Query(() => [InviteType])
    public async groupInvites(
        @Arg('args') args: GroupInvitesArgs
    ): Promise<InviteType[]> {
        return this.service.findInvites(args)
    }

    @Authorized()
    @Mutation(() => DeleteInvitePayload)
    public async deleteInvite(
        @Arg('input') input: DeleteInviteInput
    ): Promise<DeleteInvitePayload> {
        return this.service.deleteInvite(input)
    }

}
