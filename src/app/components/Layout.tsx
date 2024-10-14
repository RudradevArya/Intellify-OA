
// import React from 'react'
// import Sidebar from './Sidebar'

// const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6 overflow-auto">
//         {children}
//       </main>
//     </div>
//   )
// }

// export default Layout

import React, { useState } from 'react'
import Link from 'next/link'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <Link href="/dashboard" className="text-white flex items-center space-x-2 px-4">
          <span className="text-2xl font-extrabold">Dashboard</span>
        </Link>
        <nav>
          <Link href="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
            Home
          </Link>
          <Link href="/data-input" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
            Add Data
          </Link>
        </nav>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout