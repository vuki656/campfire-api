import { verify } from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string

type AuthDataType = {
    userId: string
}

export const decodeToken = (tokenPayload: string): AuthDataType => {
    const [, token] = tokenPayload.split(' ')
    const authData: AuthDataType = { userId: '' }

    if (token) {
        verify(token, SECRET, (error, result) => {
            if (!error) {
                // @ts-expect-error
                const userId = result?.userId ?? ''

                authData.userId = userId
            }
        })
    }

    return authData
}
