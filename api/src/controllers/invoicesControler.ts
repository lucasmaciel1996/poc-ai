import { FastifyRequest, FastifyReply } from 'fastify'
import { InvoicesService } from '../services/invoicesService'

export class InvoicesControler {
    constructor(private readonly invoicesService: InvoicesService) { }

    async findInvoicesByCustomerId(request: FastifyRequest, reply: FastifyReply) {
        const { customerId } = request.params as Record<string, string>

        const invoices = await this.invoicesService.findByCustomerId(customerId)
        
        return reply.send({ data: invoices })
    }

    async pay(request: FastifyRequest, reply: FastifyReply) {
        const { invoiceId } = request.params as Record<string, string>

        await this.invoicesService.pay(invoiceId)
        
        return reply.send()
    }

    async refund(request: FastifyRequest, reply: FastifyReply) {
        const { invoiceId } = request.params as Record<string, string>

        await this.invoicesService.refund(invoiceId)
        
        return reply.send()
    }
}