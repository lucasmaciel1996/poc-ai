
import { BadRequestError } from '../erros/badrequest'
import { InvoicesRepository } from '../repositories/invoicesRepository'


export class InvoicesService {
    constructor(private readonly invoicesRepository: InvoicesRepository) { }

    async create(payload: {
        amount: number,
        dueDate: string,
        customerId: number
    }) {
        return await this.invoicesRepository.create(payload)
    }

    async find() {
        return await this.invoicesRepository.find()
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
    async cancel(invoiceId: number) {
        const invoice = await this.invoicesRepository.findById(invoiceId)
        if (!invoice) {
            throw new BadRequestError('Invoice not found','INVOICE_NOT_FOUND')
        }

         await this.invoicesRepository.update(invoiceId, {
            status: 'cancel',
        })
    }
}