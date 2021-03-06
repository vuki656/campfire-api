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
    CreatePostInput,
    FavoritePostInput,
} from './mutations/inputs'
import { CreatePostPayload } from './mutations/payloads'
import { PostService } from './Post.service'
import { PostType } from './types'

@Resolver(() => PostType)
export class PostResolver {

    private readonly service: PostService

    constructor() {
        this.service = new PostService()
    }

    @Authorized()
    @Mutation(() => CreatePostPayload)
    public async createPost(
        @Arg('input') input: CreatePostInput,
        @Ctx() context: ContextType
    ): Promise<CreatePostPayload> {
        return this.service.create(input, context)
    }

    @Authorized()
    @Mutation(() => Boolean)
    public async favoritePost(
        @Arg('input') input: FavoritePostInput,
        @Ctx() context: ContextType
    ): Promise<boolean> {
        return this.service.favorite(input, context)
    }

    @Authorized()
    @Query(() => [PostType])
    public async favoritePosts(
        @Ctx() context: ContextType
    ): Promise<PostType[]> {
        return this.service.findFavorites(context.userId)
    }

}
