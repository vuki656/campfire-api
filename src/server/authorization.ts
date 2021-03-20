import { verify } from 'jsonwebtoken'
import type { AuthChecker } from 'type-graphql'
import validator from 'validator'

import type { ContextType } from '../types'

export const authChecker: AuthChecker<ContextType> = (resolverData): boolean => {
    const tokenPayload = resolverData.context.tokenPayload
    const SECRET = process.env.JWT_SECRET as string

    if (!SECRET) {
        return false
    }

    if (!tokenPayload) {
        return false
    }

    const [tokenFormat, token] = tokenPayload.split(' ')

    if (tokenFormat !== 'Bearer') {
        return false
    }

    if (!token) {
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
