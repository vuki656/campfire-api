import {
    Field,
    ObjectType,
} from 'type-graphql'

import { GroupType } from '../../types'

@ObjectType()
export class CreateGroupPayload {

    @Field()
    group: GroupType

    constructor(group: GroupType) {
        this.group = group
    }

}
