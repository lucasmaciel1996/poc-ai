
import { PrismaClient } from "../../generated/prisma";


export class InvoicesRepository {
    constructor(private readonly db: PrismaClient) { }

    async create(payload: {
        amount: number,
        dueDate: string,
        customerId: number
    }) {
        const {
            amount,
            dueDate,
            customerId
        } = payload

        const res = await this.db.invoice.create({
            data: {
                status: 'open',
                createdAt: new Date(),
                amount,
                dueDate: new Date(dueDate),
                customerId
            }
        })
        return res
    }
    
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