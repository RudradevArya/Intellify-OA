import { withAuth } from '@/components/ProtectedRoute'
import Layout from '@/components/Layout'
import Dashboard from '@/components/Dashboard'
import RealtimeWidget from '@/components/RealtimeWidget'
import DataInputForm from '@/components/DataInputForm'

function DashboardPage() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dashboard />
        <RealtimeWidget />
      </div>
      <div className="mt-8">
        <DataInputForm />
      </div>
    </Layout>
  )
}

export default withAuth(DashboardPage)
// import { useEffect, useState } from 'react'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
// import { supabase } from '@/lib/supabase'
// import Layout from '@/components/Layout'

// // import { withAuth } from '@/components/ProtectedRoute'
// // import Dashboard from '@/components/Dashboard'

// // function DashboardPage() {
// //   return <Dashboard />
// // }

// // export default withAuth(DashboardPage)

// export default function Dashboard() {
//   const [data, setData] = useState([])

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     const { data, error } = await supabase
//       .from('metrics')
//       .select('*')
//     if (error) console.error('Error fetching data:', error)
//     else setData(data)
//   }

//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <div className="bg-white p-4 rounded shadow">
//         <LineChart width={600} height={300} data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="value" stroke="#8884d8" />
//         </LineChart>
//       </div>
//     </Layout>
//   )
// }