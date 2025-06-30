import sqlite from 'sqlite3'

const db = new sqlite.Database('db.sqlite')


async function dropTable(tables) {
  for (const table of tables) {
    console.log(`dropTable - ${table}`,)
    await db.exec(`DROP table IF EXISTS ${table}`)

  }
}

async function createTable() {
  await dropTable(['invoices'])

  const invoiceTable = `
  CREATE TABLE IF NOT EXISTS invoices (
    id VARCHAR PRIMARY KEY,                                         
    customer_id VARCHAR,                                           
    due_date VARCHAR                                            
    amount REAL NOT NULL,                                        
    status VARCHAR NOT NULL,                                     
    deleted_at VARCHAR                                            
  );
`;

  const tables = [invoiceTable]

  for (const table of tables) {
    console.log(`createTable - ${table}`,)
    await db.exec(table, (err) => {
      if (err) {
        console.error('❌ Error creating table:', err.message);
      } else {
        console.log('✅ table created');
      }
    })
  }

}

async function seed() {
  const invoices = [{
    customer_id: '851bbbf8-ba8a-47a4-b1ba-94bbecb443e4',
    due_date: '2025-06-05T03:00:00.000Z',
    amount: 100,
    status: 'open',
  },
  {
    customer_id: '851bbbf8-ba8a-47a4-b1ba-94bbecb443e4',
    due_date: '2025-07-05T03:00:00.000Z',
    amount: 100,
    status: 'open',
  },
  {
    customer_id: '9a5232dd-bac5-48d1-9c43-352cec161c84',
    due_date: '2025-07-05T03:00:00.000Z',
    amount: 250,
    status: 'open',
  },
  {
    customer_id: '9a5232dd-bac5-48d1-9c43-352cec161c84',
    due_date: '2025-07-05T03:00:00.000Z',
    amount: 100,
    status: 'open',
  }
  ]

  // const stmt = db.prepare("INSERT INTO invoices VALUES (?,?,?,?,?)");

  for (const [idx,row] of invoices.entries()) {
    const { amount, customer_id, due_date, id= `${new Date().getTime()}${idx}`, status } = row
      //   stmt.run(id, customer_id, due_date, amount, status)
      const comman = `INSERT INTO invoices VALUES ('${id}','${customer_id}','${due_date}',${amount},'${status}');`
      console.log(comman)

    await db.exec(comman)
  }

  console.log('invoices', await db.all('SELECT id FROM invoices'))
}


async function main() {
  await createTable()
  await seed()

  db.close();
}

main()