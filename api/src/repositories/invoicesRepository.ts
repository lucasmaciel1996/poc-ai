
import { PrismaClient } from "../../generated/prisma";


export class InvoicesRepository {
    constructor(private readonly db: PrismaClient) { }

    async find() {
        const res = await this.db.invoice.findMany({
            include:{
                customer:true
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