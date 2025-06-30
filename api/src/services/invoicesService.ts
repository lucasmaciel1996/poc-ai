import { InvoicesRepository } from '../repositories/invoicesRepository'


export class InvoicesService {
    constructor(private readonly invoicesRepository: InvoicesRepository) { }

    async findByCustomerId(customerId: string){
        return await this.invoicesRepository.findByCustomerId(customerId)
    }

    async pay(invoiceId: string) {
         await this.invoicesRepository.update(invoiceId,{
            status:'paid'
        })
    }

    async refund(invoiceId: string) {
        await this.invoicesRepository.update(invoiceId,{
           status:'refund'
       })
   }
}