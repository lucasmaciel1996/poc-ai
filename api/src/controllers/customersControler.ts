import { FastifyRequest, FastifyReply } from 'fastify'
import { CustomersService } from '../services/customersService'

export class CustomersControler {
    constructor(private readonly customersService: CustomersService) { }

    async find(__: FastifyRequest, reply: FastifyReply) {
        const customers = await this.customersService.find()

        return reply.send({ data: customers })
    }


}