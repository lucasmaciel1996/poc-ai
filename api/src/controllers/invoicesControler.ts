import { FastifyRequest, FastifyReply } from 'fastify'
import { InvoicesService } from '../services/invoicesService'

export class InvoicesControler {
    constructor(private readonly invoicesService: InvoicesService) { }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const { 
            amount,
            customerId,
         } = request.body as Record<string, number>

         const { 
            dueDate,
         } = request.body as Record<string, string>
         
        await this.invoicesService.create({
            amount,
            customerId,
            dueDate
        })
        return reply.send()
    }

    async find(__: FastifyRequest, reply: FastifyReply) {
        const invoices = await this.invoicesService.find()
        return reply.send({ data: invoices })
    }

    async pay(request: FastifyRequest, reply: FastifyReply) {
        const { invoiceId } = request.params as Record<string, number>

        await this.invoicesService.pay(Number(invoiceId))
        
        return reply.send()
    }

    async refund(request: FastifyRequest, reply: FastifyReply) {
        const { invoiceId } = request.params as Record<string, number>

        await this.invoicesService.refund(Number(invoiceId))
        
        return reply.send()
    }
}