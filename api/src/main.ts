import { fastify } from 'fastify'
import { container } from './container'
import { InvoicesControler } from './controllers/invoicesControler'

import { AIControler } from './controllers/aiControler'
import { CustomersControler } from './controllers/customersControler'

const app = fastify({ logger: true })

const invoiceController = container.get<InvoicesControler>('InvoicesControler')
const aiControler = container.get<AIControler>('AIControler')
const customersControler = container.get<CustomersControler>('CustomersControler')

app.get('/invoices', invoiceController.find.bind(invoiceController))
app.post('/invoices', invoiceController.create.bind(invoiceController))
app.post('/invoices/:invoiceId/pay', invoiceController.pay.bind(invoiceController))
app.post('/invoices/:invoiceId/refund', invoiceController.refund.bind(invoiceController))
app.post('/invoices/:invoiceId/cancel', invoiceController.cancel.bind(invoiceController))


app.get('/customers', customersControler.find.bind(customersControler))

app.post('/ai', aiControler.generateCommand.bind(aiControler))

export { app }