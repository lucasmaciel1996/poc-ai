import { useEffect, useState } from 'react'
import { InvoicesTable } from './components/InvoicesTable';
import { Header } from './components/Header';
import { ModalAI } from './components/Modal';


function App() {
  const [invoices, setInvoices] = useState([])
  const [refreshInterval, setRefreshInterval] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);


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


  async function handleInvoices() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/invoices`)
    const json = await res.json()

    setInvoices(json.data)
  }

  function handleSetIsModalOpen() {
    console.log('CLICK', !isModalOpen)
    setIsModalOpen(!isModalOpen)
  }

  return (
    <main className='h-full bg-gray-900 w-full p-8 flex flex-col justify-start align-top'>
      <Header />

      <div className=' flex justify-between'>
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

        <button
          className=' text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'
          onClick={handleSetIsModalOpen}
        >Command</button>
      </div>

      <aside className='flex flex-col justify-center bg-slate-800 p-4 rounded-xl'>
        <h1 className='pb-2 text-zinc-300 text-3xl font-semibold'>Invoices</h1>
        <InvoicesTable invoices={invoices} />
      </aside>

      <section>
        <ModalAI open={isModalOpen} onClose={handleSetIsModalOpen} data={{ invoices }} />
      </section>
    </main>
  )
}

export default App
