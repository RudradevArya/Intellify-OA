// import { Inter } from 'next/font/google'
// import './globals.css'
// import Header from '@/components/Layout/Header'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Dashboard App',
//   description: 'Interactive dashboard using Next.js, Recharts, and Supabase',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Header />
//         <main>{children}</main>
//       </body>
//     </html>
//   )
// }

import './globals.css'
import Sidebar from '@/components/Layout/Sidebar'

export const metadata = {
  title: 'Dashboard App',
  description: 'Interactive dashboard using Next.js, Recharts, and Supabase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="md:ml-64 p-4">
          {children}
        </main>
      </body>
    </html>
  )
}