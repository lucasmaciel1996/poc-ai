import { useState } from 'react'

import './App.css'
import { runCommand } from './services/aiCommand'


function App() {
  const [command, setCommand] = useState<string>('')
  const [result, setResult] = useState({ data: '' })
  const [loading, setLoading] = useState(false)

  async function handlerommand() {
    setLoading(true)
    const result = await runCommand(command)
      .finally(() => setLoading(false))

    setCommand('')
    setResult(result)
  }

  return (
    <main>
      <div>

        <h1> AI :)</h1>
      </div>
      <section className='card'>
        <h4>Como posso ajudar?</h4>
        <textarea placeholder='o que deseja fazer ?' onChange={(e) => setCommand(e.target.value)} />
        <button onClick={handlerommand} disabled={loading}>Command</button>
      </section>
      <section className='card'>
        {
          loading ? null : (
            <div dangerouslySetInnerHTML={{ __html: result.data }}></div>
          )
        }
      </section>
    </main>
  )
}

export default App
