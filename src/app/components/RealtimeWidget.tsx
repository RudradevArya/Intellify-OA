import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function RealtimeWidget() {
  const [data, setData] = useState([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchData()
    const channel = supabase
      .channel('realtime metrics')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'realtime_metrics' }, payload => {
        setData(currentData => [...currentData, payload.new])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('realtime_metrics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    if (error) console.error('Error fetching data:', error)
    else setData(data.reverse())
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Real-time Metrics</h2>
      <LineChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  )
}