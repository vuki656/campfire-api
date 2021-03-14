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

import { UserType } from '../User/types'

import {
    GroupArgs,
    GroupMembersArgs,
} from './args'
import {
    CreateGroupInput,
    EditGroupInput,
    KickUserFromGroupInput,
} from './mutations/inputs'
import {
    CreateGroupPayload,
    EditGroupPayload,
    KickUserFromGroupPayload,
} from './mutations/payloads'
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
    @Query(() => [GroupType])
    public async userCreatedGroups(
        @Ctx() context: ContextType
    ): Promise<GroupType[]> {
        return this.service.findCreated(context.userId)
    }

    @Authorized()
    @Query(() => [UserType])
    public async groupMembers(
        @Arg('args') args: GroupMembersArgs,
    ): Promise<UserType[]> {
        return this.service.findMembers(args)
    }

    @Authorized()
    @Query(() => [GroupType])
    public async userJoinedGroups(
        @Ctx() context: ContextType
    ): Promise<GroupType[]> {
        return this.service.findJoined(context.userId)
    }

    @Authorized()
    @Mutation(() => CreateGroupPayload)
    public async createGroup(
        @Arg('input') input: CreateGroupInput,
        @Ctx() context: ContextType
    ): Promise<CreateGroupPayload> {
        return this.service.create(input, context.userId)
    }

    @Authorized()
    @Mutation(() => EditGroupPayload)
    public async editGroup(
        @Arg('input') input: EditGroupInput,
    ): Promise<EditGroupPayload> {
        return this.service.edit(input)
    }

    @Authorized()
    @Mutation(() => KickUserFromGroupPayload)
    public async kickUserFromGroup(
        @Arg('input') input: KickUserFromGroupInput,
    ): Promise<KickUserFromGroupPayload> {
        return this.service.kickUser(input)
    }

}
