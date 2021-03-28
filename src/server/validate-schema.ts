import 'reflect-metadata'
import { server } from './server'

void server
    .listen()
    .then(() => {
        void server.stop()
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
    })
