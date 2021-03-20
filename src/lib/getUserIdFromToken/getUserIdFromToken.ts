import { verify } from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string

export const getUserIdFromToken = (tokenPayload: string): string => {
    const [, token] = tokenPayload.split(' ')
    let userId = ''

    if (token) {
        verify(token, SECRET, (error, result) => {
            if (!error) {
                // @ts-expect-error
                const decodedUserId = result?.userId ?? ''

                userId = decodedUserId
            }
        })
    }

    return userId
}
