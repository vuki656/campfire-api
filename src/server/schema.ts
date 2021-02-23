import type { GraphQLSchema } from 'graphql'
import type { NonEmptyArray } from 'type-graphql'
import { buildSchemaSync } from 'type-graphql'

import * as resolvers from '../resolvers'

export const getSchema = (): GraphQLSchema => {
    return buildSchemaSync({
        resolvers: [...Object.values(resolvers)] as unknown as NonEmptyArray<string>,
        validate: false,
    })
}
