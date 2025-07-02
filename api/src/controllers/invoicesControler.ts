import { FastifyRequest, FastifyReply } from 'fastify'
import { InvoicesService } from '../services/invoicesService'

export class InvoicesControler {
    constructor(private readonly invoicesService: InvoicesService) { }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const {
            amount,
            customerId,
            dueDate
        } = typeof request.body === 'string' ? JSON.parse(request.body as any) : request.body


        await this.invoicesService.create({
            amount,
            customerId,
            dueDate
        })
        return reply.send({ status: 'INVOICE_CREATED' })
    }

    async find(__: FastifyRequest, reply: FastifyReply) {
        const invoices = await this.invoicesService.find()
        return reply.send({ data: invoices })
    }

    async pay(request: FastifyRequest, reply: FastifyReply) {
        const { invoiceId } = request.params as Record<string, number>

        await this.invoicesService.pay(Number(invoiceId))

        return reply.send({ status: 'INVOICE_PAID' })
    }

    async refund(request: FastifyRequest, reply: FastifyReply) {
        const { invoiceId } = request.params as Record<string, number>

        await this.invoicesService.refund(Number(invoiceId))

        return reply.send({ status: 'INVOICE_REFUND' })
    }
}