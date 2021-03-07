import {
    Authorized,
    Ctx,
    Query,
    Resolver,
} from 'type-graphql'

import { InviteService } from '.'

import { ContextType } from '../../types'
import { InviteType } from '../User/types'

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

}
