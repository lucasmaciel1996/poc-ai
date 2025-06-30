import { fastify } from 'fastify'
import { container } from './container'
import { InvoicesControler } from './controllers/invoicesControler'

import { AIControler } from './controllers/aiControler'

const app = fastify({ logger: true })

const invoiceController = container.get<InvoicesControler>('InvoicesControler')
const aiControler = container.get<AIControler>('AIControler')

app.get('/invoices/customers/:customerId', invoiceController.findInvoicesByCustomerId.bind(invoiceController))
app.post('/invoices/:invoiceId/pay', invoiceController.pay.bind(invoiceController))
app.post('/invoices/:invoiceId/refund', invoiceController.refund.bind(invoiceController))


app.post('/ai', aiControler.generateCommand.bind(aiControler))

export { app }