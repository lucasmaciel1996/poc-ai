
import { PrismaClient } from '../../generated/prisma'


const prisma = new PrismaClient()


async function seed() {
  await prisma.invoice.deleteMany()

  await prisma.customer.deleteMany()
  
  const customer1 = await prisma.customer.create({
    data: { name: 'João Carlos', email: 'joao.carlos@gmail.com',avatar:'https://avatars.githubusercontent.com/u/1?v=4' }
  })

  const customer2 = await prisma.customer.create({
    data: { name: 'Ana Maria', email: 'ana.maria@gmail.com',avatar:'https://avatars.githubusercontent.com/u/18?v=4' }
  })

 
  
  await prisma.invoice.createMany({
    data: [{
      amount: Math.floor(Math.random() * 100 + 40),
      customerId: customer1.id,
      dueDate: new Date('2025-05-05T00:00:00.000Z'),
      createdAt:new Date('2025-04-05T00:00:00.000Z'),
      paidAt: new Date('2025-05-05T00:00:00.000Z'),
      status: 'paid'
    },
    {
      amount: Math.floor(Math.random() * 100 + 40),
      customerId: customer1.id,
      dueDate: new Date('2025-06-05T00:00:00.000Z'),
      createdAt: new Date('2025-05-05T00:00:00.000Z'),
      status: 'open'
    },
    {
      amount: Math.floor(Math.random() * 100 + 40),
      customerId: customer1.id,
      dueDate: new Date('2025-04-05T00:00:00.000Z'),
      createdAt: new Date('2025-03-05T00:00:00.000Z'),
      paidAt: new Date('2025-04-06T00:00:00.000Z'),
      refundedAt: new Date('2025-05-05T00:00:00.000Z'),
      status: 'refund'
    },
    {
      amount: Math.floor(Math.random() * 100 + 40),
      customerId: customer2.id,
      dueDate: new Date('2025-07-05T00:00:00.000Z'),
      createdAt: new Date('2025-06-05T00:00:00.000Z'),
      status: 'open'
    },
    {
      amount: Math.floor(Math.random() * 100 + 40),
      customerId: customer2.id,
      dueDate: new Date('2025-07-05T00:00:00.000Z'),
      paidAt: new Date('2025-07-06T00:00:00.000Z'),
      status: 'paid'
    },
    {
      amount: Math.floor(Math.random() * 100 + 40),
      customerId: customer2.id,
      dueDate: new Date('2025-07-05T00:00:00.000Z'),
      paidAt: new Date('2025-07-06T00:00:00.000Z'),
      status: 'paid'
    },
    {
      amount: Math.floor(Math.random() * 100 + 40),
      customerId: customer2.id,
      dueDate: new Date('2025-08-05T00:00:00.000Z'),
      createdAt: new Date('2025-07-05T00:00:00.000Z'),
      status: 'open'
    }]
  })


  console.log('invoices', await prisma.invoice.findMany())
}


async function main() {
  await seed()
}

main()