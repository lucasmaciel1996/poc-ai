import { FastifyRequest, FastifyReply } from 'fastify'
import { AIService } from '../services/aiService'


export class AIControler {
    constructor(private readonly aIService: AIService) { }

    async generateCommand(request: FastifyRequest, reply: FastifyReply) {
        const json = request.body

        const { command = '', data = [] } = typeof json === 'string' ? JSON.parse(json) : json


        const result = await this.aIService.generateCommand(command, data)

        const responseText = result.choices[0] ? result.choices[0].message.content : ''

        return reply.send({ responseText, command })
    }
}