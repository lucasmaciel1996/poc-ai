import { useEffect, useState } from 'react'

// import './App.css'
// import { runCommand } from './services/aiCommand'
import { InvoicesTable } from './components/InvoicesTable';
import { Header } from './components/Header';


function App() {
  // const [command, setCommand] = useState<string>('')
  // const [result, setResult] = useState({ data: '' })
  // const [loading, setLoading] = useState(false)
  const [invoices, setInvoices] = useState([])
  const [refreshInterval, setRefreshInterval] = useState(10);


  useEffect(() => {
    if (refreshInterval > 0) {
      const intervalId = setInterval(() => {
        handleInvoices()
      }, refreshInterval * 1000); // convert seconds to ms

      return () => clearInterval(intervalId); // cleanup on unmount or interval change
    }
  }, [refreshInterval]);

  useEffect(() => {
    handleInvoices()
  }, [])

  // async function handlerommand() {
  //   setLoading(true)
  //   const result = await runCommand(command)
  //     .finally(() => setLoading(false))

  //   setCommand('')
  //   setResult(result)
  // }

  async function handleInvoices() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/invoices`)
    const json = await res.json()

    setInvoices(json.data)
  }

  return (
    <main className='h-full bg-gray-900 w-full p-8 flex flex-col justify-start align-top'>
      <Header />
      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white pb-2 max-w-sm'>
        Refresh every:
        <select
          value={refreshInterval}
          onChange={e => setRefreshInterval(Number(e.target.value))}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value={0}>Never</option>
          <option value={5}>5 seconds</option>
          <option value={10}>10 seconds</option>
          <option value={30}>30 seconds</option>
          <option value={60}>1 minute</option>
        </select>
      </label>

      <aside className='flex flex-col justify-center bg-slate-800 p-4 rounded-xl'>
        <h1 className='pb-2 text-zinc-300 text-3xl font-semibold'>Invoices</h1>
        <InvoicesTable invoices={invoices} />
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
