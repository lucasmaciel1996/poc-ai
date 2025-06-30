
import { app } from './main'
import cors from '@fastify/cors'

app.register(cors,{
    origin:'*'
})


app.listen({
    port: 3000,
}).catch(e => console.error)