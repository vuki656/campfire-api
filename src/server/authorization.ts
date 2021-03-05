import { verify } from 'jsonwebtoken'
import type { AuthChecker } from 'type-graphql'
import validator from 'validator'

import type { ContextType } from '../types'

export const authChecker: AuthChecker<ContextType> = (resolverData): boolean => {
    const authPayload = resolverData.context.token
    const SECRET = process.env.JWT_SECRET as string

    if (!SECRET) {
        return false
    }

    if (!authPayload) {
        return false
    }

    const [tokenFormat, token] = authPayload.split(' ')

    if (tokenFormat !== 'Bearer') {
        return false
    }

    if (!validator.isJWT(token)) {
        return false
    }

    verify(token, SECRET, (error) => {
        if (error) {
            return false
        }
    })

    return true
}
