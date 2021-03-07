import { getLinkPreview } from 'link-preview-js'

import { prisma } from '../../server'
import type { ContextType } from '../../types'

import type {
    CreatePostInput,
    FavoritePostInput,
} from './mutations/inputs'
import { CreatePostPayload } from './mutations/payloads'
import type { PostMetadataType } from './Post.types'
import { PostType } from './types'

export class PostService {

    public async findFavorites(userId: string) {
        const favorites = await prisma.post.findMany({
            include: {
                author: true,
                favoritedBy: true,
            },
            where: {
                favoritedBy: {
                    some: {
                        userId: userId,
                    },
                },
            },
        })

        return favorites.map((favorite) => {
            return new PostType(favorite)
        })
    }

    public async create(input: CreatePostInput, context: ContextType) {
        const metadata: PostMetadataType = await getLinkPreview(input.link)
            .then((data) => {
                return {
                    faviconLink: data.favicons[0] ?? '',
                    // @ts-expect-error // https://github.com/vuki656/campfire-api/issues/6
                    imageLink: data?.images[0] ?? '',
                    // @ts-expect-error
                    siteName: data?.siteName ?? '',
                    // @ts-expect-error
                    title: data?.title ?? '',
                } as PostMetadataType
            })

        const post = await prisma.post.create({
            data: {
                authorId: context.userId,
                description: input.description,
                faviconLink: metadata.faviconLink,
                groupId: input.groupId,
                imageLink: metadata.imageLink,
                link: input.link,
                siteName: metadata.siteName,
                title: metadata.title,
            },
            include: {
                author: true,
            },
        })

        return new CreatePostPayload(post)
    }

    public async favorite(input: FavoritePostInput, context: ContextType) {
        const isFavorite = await prisma.favorite.findUnique({
            where: {
                userId_postId:
                    {
                        postId: input.postId,
                        userId: context.userId,
                    },
            },
        })

        if (isFavorite) {
            await prisma.favorite.delete({
                where: {
                    userId_postId: {
                        postId: input.postId,
                        userId: context.userId,
                    },
                },
            })
        } else {
            await prisma.favorite.create({
                data: {
                    postId: input.postId,
                    userId: context.userId,
                },
            })
        }

        return true
    }

}
