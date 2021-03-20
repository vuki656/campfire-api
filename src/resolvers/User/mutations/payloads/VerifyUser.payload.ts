import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class VerifyUserPayload {

    @Field()
    isValid: boolean

    constructor(isValid: boolean) {
        this.isValid = isValid
    }

}
