import { FastifyRequest, FastifyReply } from 'fastify'
import { AIService } from '../services/aiService'


export class AIControler {
    constructor(private readonly aIService: AIService) { }

    async generateCommand(request: FastifyRequest, reply: FastifyReply) {
        const { command } = request.body as Record<string, string>

        const result = await this.aIService.generateCommand(command)

        return reply.send({ data: result })
    }
}