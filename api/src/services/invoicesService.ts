
import { BadRequestError } from '../erros/badrequest'
import { InvoicesRepository } from '../repositories/invoicesRepository'


export class InvoicesService {
    constructor(private readonly invoicesRepository: InvoicesRepository) { }

    async findByCustomerId(customerId: number) {
        return await this.invoicesRepository.findByCustomerId(customerId)
    }

    async pay(invoiceId: number) {
        const invoice = await this.invoicesRepository.findById(invoiceId)
        if (invoice?.payedAt) return

        await this.invoicesRepository.update(invoiceId, {
            status: 'paid',
            payedAt: new Date()
        })
    }

    async refund(invoiceId: number) {
        const invoice = await this.invoicesRepository.findById(invoiceId)
        if (!invoice?.payedAt) {
            throw new BadRequestError('Invoice not paid','INVOICE_NOT_PAID')
        }

        await this.invoicesRepository.update(invoiceId, {
            status: 'refund',
            refundedAt: new Date()
        })
    }
}