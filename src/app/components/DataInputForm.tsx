import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function DataInputForm() {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('realtime_metrics')
        .insert({ name, value: parseFloat(value) })
      if (error) throw error
      alert('Data added successfully!')
      setName('')
      setValue('')
    } catch (error) {
      alert('Error adding data: ' + error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <input
        type="text"
        placeholder="Metric Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="number"
        placeholder="Metric Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">
        Add Data
      </button>
    </form>
  )
}