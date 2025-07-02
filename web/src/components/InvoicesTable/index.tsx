import { formatDate, formatMoney, formatStatusVariant } from "../../utils/format"
import { Badge } from "../Badge"

type Costumer = {
    id: string
    email: string,
    avatar: string,
    name: string
}
type Invoice = {
    id: number,
    amount: number,
    status: 'paid' | 'refund' | 'open',
    dueDate: string,
    payedAt: string,
    refundedAt: string
    createdAt: string
    customer: Costumer
}

export function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
    return (
        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Customer</th>
                    <th scope="col" className="px-6 py-3">#ID</th>
                    <th scope="col" className="px-6 py-3">Amount</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Due Date</th>
                    <th scope="col" className="px-6 py-3">Paid At</th>
                    <th scope="col" className="px-6 py-3">Refunded</th>
                    <th scope="col" className="px-6 py-3">Created At</th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((inv) => (
                    <tr key={inv.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" >
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full" src={inv.customer.avatar} alt="Jese image" />
                            <div className="ps-3">
                                <div className="text-base font-semibold">#{inv.customer.id} {inv.customer.name}</div>
                                <div className="font-normal text-gray-500">{inv.customer.email}</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">{inv.id}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >{formatMoney(inv.amount)}</td>

                        <th className="px-6 py-4" >
                            {Badge({
                                text: inv.status, variant: formatStatusVariant(inv.status)
                            })}
                        </th>
                        <td className="px-6 py-4">{formatDate(inv.dueDate)}</td>
                        <td className="px-6 py-4">{formatDate(inv.payedAt)}</td>
                        <td className="px-6 py-4">{formatDate(inv.refundedAt)}</td>
                        <td className="px-6 py-4">{formatDate(inv.createdAt, 'pt-BR', true)}</td>

                    </tr>
                ))}
            </tbody>
        </table>

    )
}