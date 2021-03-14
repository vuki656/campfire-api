import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class PostMetadataType {

    @Field()
    id: string

    @Field(() => String, { nullable: true })
    title: string | null

    @Field(() => String, { nullable: true })
    siteName: string | null

    @Field(() => String, { nullable: true })
    imageLink: string | null

    @Field(() => String, { nullable: true })
    faviconLink: string | null

    constructor(post: PostMetadataType) {
        this.id = post.id
        this.title = post.title
        this.siteName = post.siteName
        this.imageLink = post.imageLink
        this.faviconLink = post.faviconLink
    }

}
