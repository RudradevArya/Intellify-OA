'use client'

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMetrics, insertMetric,supabase } from '@/lib/supabase';

export default function Dashboard() {
    const [metrics, setMetrics] = useState([]);
    const [newMetric, setNewMetric] = useState({ name: '', value: '' });
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUserAndMetrics = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser()
          setUser(user)
          console.log('Current user:', user)
          await fetchMetrics()
        } catch (error) {
          console.error('Error in fetchUserAndMetrics:', error)
          setError('Failed to initialize dashboard: ' + error.message)
        }
      }
  
      fetchUserAndMetrics()
    }, [])
  
    const fetchMetrics = async () => {
      try {
        const data = await getMetrics();
        setMetrics(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setError('Failed to fetch metrics: ' + error.message);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await insertMetric(newMetric.name, parseFloat(newMetric.value));
        setNewMetric({ name: '', value: '' });
        fetchMetrics();
        setError(null);
      } catch (error) {
        console.error('Error inserting metric:', error);
        setError('Failed to add new metric: ' + error.message);
      }
    };
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-indigo-600">Dashboard</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {user && <p className="text-green-500 mb-4">Logged in as: {user.email}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Line Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="metric_value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="metric_value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Pie Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={metrics} 
                dataKey="metric_value" 
                nameKey="metric_name" 
                label
                labelLine={false}
              >
                {metrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div> */}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Add New Metric</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Metric Name"
            value={newMetric.name}
            onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="number"
            placeholder="Metric Value"
            value={newMetric.value}
            onChange={(e) => setNewMetric({ ...newMetric, value: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button type="submit" className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add Metric
          </button>
        </form>
      </div>
    </div>
  );
}
// export default function Dashboard() {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//         <p>Welcome to your dashboard!</p>
//         {/* Add more dashboard content here */}
//       </div>
//     )
//   }
//////////////////
// 'use client'

// import { useState, useEffect } from 'react';
// import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { supabase } from '@/lib/supabase';

// export default function Dashboard() {
//   const [metrics, setMetrics] = useState([]);
//   const [newMetric, setNewMetric] = useState({ name: '', value: '' });

//   useEffect(() => {
//     fetchMetrics();
//     const channel = supabase
//       .channel('custom-all-channel')
//       .on('postgres_changes', { event: '*', schema: 'public', table: 'dashboard_metrics' }, payload => {
//         console.log('Change received!', payload);
//         fetchMetrics();
//       })
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const fetchMetrics = async () => {
//     const { data, error } = await supabase.from('dashboard_metrics').select('*');
//     if (error) console.error('Error fetching metrics:', error);
//     else setMetrics(data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { data, error } = await supabase
//       .from('dashboard_metrics')
//       .insert([{ metric_name: newMetric.name, metric_value: parseFloat(newMetric.value) }]);
//     if (error) console.error('Error inserting metric:', error);
//     else {
//       setNewMetric({ name: '', value: '' });
//       fetchMetrics();
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-lg font-semibold mb-2">Line Chart</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={metrics}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="metric_name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="metric_value" stroke="#8884d8" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
        
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-lg font-semibold mb-2">Bar Chart</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={metrics}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="metric_name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="metric_value" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
        
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-lg font-semibold mb-2">Pie Chart</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={metrics} dataKey="metric_value" nameKey="metric_name" fill="#8884d8" label />
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
      
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-2">Add New Metric</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Metric Name"
//             value={newMetric.name}
//             onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value })}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="number"
//             placeholder="Metric Value"
//             value={newMetric.value}
//             onChange={(e) => setNewMetric({ ...newMetric, value: e.target.value })}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
//             Add Metric
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }