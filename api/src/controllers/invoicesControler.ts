import { FastifyRequest, FastifyReply } from 'fastify'
import { InvoicesService } from '../services/invoicesService'

export class InvoicesControler {
    constructor(private readonly invoicesService: InvoicesService) { }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const {
            amount,
            customerId,
            dueDate
        } = request.body as {
            amount: number,
            customerId: number,
            dueDate: string
        }


         await this.invoicesService.create({
            amount,
            customerId,
            dueDate
        })
        return reply.send({status:'INVOICE_CREATED'})
    }

    async find(__: FastifyRequest, reply: FastifyReply) {
       return await this.invoicesService.find()
    }

    async pay(request: FastifyRequest, reply: FastifyReply) {
        const { invoiceId } = request.params as Record<string, number>

        await this.invoicesService.pay(Number(invoiceId))

        return reply.send({status:'INVOICE_PAID'})
    }

    async refund(request: FastifyRequest, reply: FastifyReply) {
        const { invoiceId } = request.params as Record<string, number>

        await this.invoicesService.refund(Number(invoiceId))

        return reply.send({status:'INVOICE_REFUND'})
    }
}