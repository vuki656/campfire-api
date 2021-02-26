import { ContextType } from 'src/types'
import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
} from 'type-graphql'

import { GroupService } from '.'

import { CreateGroupInput } from './mutations/inputs'
import { CreateGroupPayload } from './mutations/payloads'

export class GroupResolver {

    private readonly service: GroupService

    constructor() {
        this.service = new GroupService()
    }

    @Authorized()
    @Mutation(() => CreateGroupPayload)
    public async createGroup(
        @Arg('input') input: CreateGroupInput,
        @Ctx() context: ContextType
    ): Promise<CreateGroupPayload> {
        return this.service.create(input, context)
    }

}
