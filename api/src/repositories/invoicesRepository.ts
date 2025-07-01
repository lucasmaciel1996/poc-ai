
import { PrismaClient } from "../../generated/prisma";


export class InvoicesRepository {
    constructor(private readonly db: PrismaClient) { }

    async findByCustomerId(customerId: number) {
        const res = await this.db.invoice.findMany({
            where:{
                customerId:{
                    equals:customerId
                }
            }
        })
        return res
    }

    async findById(id: number) {
        const res = await this.db.invoice.findFirst({
            where: {
                id
            }
        })
        return res
    }

    async update(invoiceId: number, payload: Record<string, unknown>) {
        await this.db.invoice.update({
            data: payload,
            where: {
                id: invoiceId
            }
        })

    }
}