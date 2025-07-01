
import { PrismaClient } from "../../generated/prisma";


export class CustomersRepository {
    constructor(private readonly db: PrismaClient) { }

    async find() {
        const res = await this.db.customer.findMany()
        return res
    }


}