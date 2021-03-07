import { getLinkPreview } from 'link-preview-js'

import { prisma } from '../../server'

import type {
    CreatePostInput,
    FavoritePostInput,
} from './mutations/inputs'
import { CreatePostPayload } from './mutations/payloads'
import { PostType } from './types'
import { FavoriteType } from './types/Favorite.type'
import type { PostMetadataType } from './types/PostMetadata.type'

export class PostService {

    public async findFavorites(userId: string) {
        const favorites = await prisma.post.findMany({
            include: {
                author: true,
                favoritedBy: true,
                metadata: true,
            },
            where: {
                favoritedBy: {
                    some: {
                        userId: userId,
                    },
                },
            },
        })

        return favorites.map((favorite) => new PostType(favorite))
    }

    public async create(
        input: CreatePostInput,
        userId: string
    ) {
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
                authorId: userId,
                description: input.description,
                groupId: input.groupId,
                link: input.link,
                metadata: {
                    create: {
                        faviconLink: metadata.faviconLink,
                        imageLink: metadata.imageLink,
                        siteName: metadata.siteName,
                        title: metadata.title,
                    },
                },
            },
            include: {
                author: true,
            },
        })

        return new CreatePostPayload(post)
    }

    public async favorite(
        input: FavoritePostInput,
        userId: string
    ) {
        let favoritePost = await prisma.favorite.findUnique({
            where: {
                userId_postId:
                    {
                        postId: input.postId,
                        userId: userId,
                    },
            },
        })

        if (favoritePost) {
            await prisma.favorite.delete({
                where: {
                    userId_postId: {
                        postId: input.postId,
                        userId: userId,
                    },
                },
            })
        } else {
            favoritePost = await prisma.favorite.create({
                data: {
                    postId: input.postId,
                    userId: userId,
                },
            })
        }

        return new FavoriteType(favoritePost)
    }

}
