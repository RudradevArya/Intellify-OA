import { useEffect, useState } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const [lineData, setLineData] = useState([])
  const [barData, setBarData] = useState([])
  const [pieData, setPieData] = useState([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: lineData, error: lineError } = await supabase
      .from('line_metrics')
      .select('*')
    if (lineError) console.error('Error fetching line data:', lineError)
    else setLineData(lineData)

    const { data: barData, error: barError } = await supabase
      .from('bar_metrics')
      .select('*')
    if (barError) console.error('Error fetching bar data:', barError)
    else setBarData(barData)

    const { data: pieData, error: pieError } = await supabase
      .from('pie_metrics')
      .select('*')
    if (pieError) console.error('Error fetching pie data:', pieError)
    else setPieData(pieData)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Line Chart</h2>
        <LineChart width={400} height={300} data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Bar Chart</h2>
        <BarChart width={400} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Pie Chart</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            cx={200}
            cy={150}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}