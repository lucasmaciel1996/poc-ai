import { useEffect, useState } from 'react'

import './App.css'
import { runCommand } from './services/aiCommand'


function App() {
  const [command, setCommand] = useState<string>('')
  const [result, setResult] = useState({ data: '' })
  const [loading, setLoading] = useState(false)
  const [invoices, setInvoices] = useState<Array<{ id: string, amount: number, status: string }>>([])
  const [refreshInterval, setRefreshInterval] = useState(10);


  useEffect(() => {
    if (refreshInterval > 0) {
      const intervalId = setInterval(() => {
        window.location.reload();
      }, refreshInterval * 1000); // convert seconds to ms

      return () => clearInterval(intervalId); // cleanup on unmount or interval change
    }
  }, [refreshInterval]);

  useEffect(() => {
    handleInvoices()
  }, [])

  async function handlerommand() {
    setLoading(true)
    const result = await runCommand(command)
      .finally(() => setLoading(false))

    setCommand('')
    setResult(result)
  }

  async function handleInvoices() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/invoices/customers/851bbbf8-ba8a-47a4-b1ba-94bbecb443e4`)
    const json = await res.json()
    console.log(json)
    setInvoices([{
      id: '1q211',
      amount: 100,
      status: 'open'
    }])
  }

  return (
    <main>
      <label>
        Refresh every:
        <select
          value={refreshInterval}
          onChange={e => setRefreshInterval(Number(e.target.value))}
        >
          <option value={0}>Never</option>
          <option value={5}>5 seconds</option>
          <option value={10}>10 seconds</option>
          <option value={30}>30 seconds</option>
          <option value={60}>1 minute</option>
        </select>
      </label>

      <aside>
        <h4> Invoices</h4>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.amount}</td>
                <td>{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </aside>
      {/* <section>
        <h4>How can I help?</h4>
        <textarea placeholder='What do you want to do?' onChange={(e) => setCommand(e.target.value)} />
        <button onClick={handlerommand} disabled={loading}>Command</button>

        <div>
          {
            loading
              ? (<p>Loading...</p>)
              : (
                <div dangerouslySetInnerHTML={{ __html: result.data }}></div>
              )
          }

        </div>
      </section> */}
    </main>
  )
}

export default App
