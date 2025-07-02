import { FastifyRequest, FastifyReply } from 'fastify'
import { AIService } from '../services/aiService'


export class AIControler {
    constructor(private readonly aIService: AIService) { }

    async generateCommand(request: FastifyRequest, reply: FastifyReply) {
        const { command,data=null } = request.body as Record<string, string>

        const result = await this.aIService.generateCommand(command,data)

        return reply.send({ data: result })
    }
}