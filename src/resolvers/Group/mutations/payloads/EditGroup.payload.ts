import {
    Field,
    ObjectType,
} from 'type-graphql'

import { GroupType } from '../../types'

@ObjectType()
export class EditGroupPayload {

    @Field()
    group: GroupType

    constructor(group: GroupType) {
        this.group = group
    }

}
