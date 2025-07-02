import { useEffect, useState } from 'react'
import { InvoicesTable } from './components/InvoicesTable';
import { Header } from './components/Header';
import { ModalAI } from './components/Modal';


function App() {
  const [invoices, setInvoices] = useState([])
  const [refreshInterval, setRefreshInterval] = useState(60);
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

      <div className='w-1/4 mb-2 text-sm font-medium text-gray-900 dark:text-white pb-2 max-w-sm'>
        <label >
          Refresh every:
          <select
            value={refreshInterval}
            onChange={e => setRefreshInterval(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={0}>Never</option>
            <option value={10}>10 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
          </select>
        </label>
      </div>
      <aside className='flex flex-col justify-center bg-slate-800 p-4 rounded-xl'>
        <h1 className='pb-2 text-zinc-300 text-3xl font-semibold'>Invoices</h1>
        <InvoicesTable invoices={invoices} />

        <button
          className='bg-transparent text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium  px-5 py-2.5 text-center  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 fixed right-4  bottom-12 z-50 p-4 rounded-full shadow-lg'
          onClick={handleSetIsModalOpen}
        >
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 21">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.24 7.194a24.16 24.16 0 0 1 3.72-3.062m0 0c3.443-2.277 6.732-2.969 8.24-1.46 2.054 2.053.03 7.407-4.522 11.959-4.552 4.551-9.906 6.576-11.96 4.522C1.223 17.658 1.89 14.412 4.121 11m6.838-6.868c-3.443-2.277-6.732-2.969-8.24-1.46-2.054 2.053-.03 7.407 4.522 11.959m3.718-10.499a24.16 24.16 0 0 1 3.719 3.062M17.798 11c2.23 3.412 2.898 6.658 1.402 8.153-1.502 1.503-4.771.822-8.2-1.433m1-6.808a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
          </svg>
        </button>
      </aside>

      <section>
        <ModalAI open={isModalOpen} onClose={handleSetIsModalOpen} data={{ invoices }} />
      </section>
    </main>
  )
}

export default App
