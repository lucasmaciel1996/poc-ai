
import dotEnv from 'dotenv'
dotEnv.config()


import { app } from './main'
import cors from '@fastify/cors'

app.register(cors,{
    origin:'*'
})

app.setErrorHandler((error, request, reply) => {

  
    const status = error.statusCode ?? 500
    const code = error.code ?? 'DAFAULT_ERROR'
    const message = error.message ?? 'Default Error'

    const response = {
        code,
        message
    }
  
    return reply.status(status).send(response)
  })

app.listen({
    port: 3000,
}).catch(e => console.error)