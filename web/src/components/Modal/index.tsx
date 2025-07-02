import { useState } from "react"

type ModalAiProp = {
    data: any
    open: boolean
    onClose: () => void
}

export function ModalAI(payload: ModalAiProp) {
    const [command, setCommand] = useState(`How many invoices are status open ?`)
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(false)

    async function handlerommand() {
        setLoading(true)
        const result = await fetch(`${import.meta.env.VITE_API_URL}/ai`, {
            method: "POST",
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                command,
                data: payload.data?.invoices
            })
        })


        const json = await result.json()

        setCommand('')
        setResult(json.responseText)
        setLoading(false)
    }

    return (
        <div
            className={`${payload.open ? '' : 'hidden'} fixed inset-0 z-50 flex justify-center items-start w-full h-full overflow-y-auto overflow-x-hidden mt-1`}
        >
            <div className="relative p-1 w-full max-w-xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={payload.onClose}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <div>
                            <h4 className='pb-2 text-zinc-300 text-2xl font-semibold'>How can I help?</h4>
                            <textarea
                                className='block p-2.5 w-full  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm'
                                placeholder='Ask me something'
                                value={command}
                                onChange={(e) => {
                                    setCommand(e.target.value)
                                }}
                            />

                        </div>
                        <button
                            type="button"
                            className='mt-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'
                            onClick={handlerommand}
                            disabled={loading}
                        >Command</button>

                        <div className="bg-slate-800 text-yellow-50 p-2 my-2 rounded min-h-40">
                            <code className="">
                                {loading ? (<p>Loading...</p>) : result}
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}