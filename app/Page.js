import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard App</h1>
      <p className="mb-4">This is an interactive dashboard application built with Next.js, Recharts, and Supabase.</p>
      <div>
        <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Login
        </Link>
        <Link href="/signup" className="bg-green-500 text-white px-4 py-2 rounded">
          Sign Up
        </Link>
      </div>
    </div>
  )
}