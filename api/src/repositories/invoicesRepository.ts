import { Database } from "sqlite3";


export class InvoicesRepository {
    protected invoices = [
        {
            id: '1',
            customer_id: '851bbbf8-ba8a-47a4-b1ba-94bbecb443e4',
            due_date: '2025-06-05T03:00:00.000Z',
            amount: 100,
            status: 'open',
        },
        {
            id: '2',
            customer_id: '851bbbf8-ba8a-47a4-b1ba-94bbecb443e4',
            due_date: '2025-07-05T03:00:00.000Z',
            amount: 100,
            status: 'open',
        },
        {
            id: '3',
            customer_id: '9a5232dd-bac5-48d1-9c43-352cec161c84',
            due_date: '2025-07-05T03:00:00.000Z',
            amount: 250,
            status: 'open',
        },
        {
            id: '4',
            customer_id: '9a5232dd-bac5-48d1-9c43-352cec161c84',
            due_date: '2025-07-05T03:00:00.000Z',
            amount: 100,
            status: 'open',
        }
    ]
    constructor(private readonly db: Database) { }

    async findByCustomerId(customerId: string) {
        const res = await Promise.resolve(
            this.invoices.filter(d => d.customer_id === customerId)
        )

        if (!res) {
            return []
        }

        return res
    }

    async update(invoiceId: string, payload: Record<string, string>) {
        const res = await Promise.resolve(
            this.invoices.find(d => d.id === invoiceId)
        )


        this.invoices = this.invoices.map(i => {
            if (i.id === invoiceId) {
                return {
                    ...i,
                    ...payload
                }
            }

            return i
        })

    }
}