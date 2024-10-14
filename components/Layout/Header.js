import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Dashboard App
        </Link>
        <div>
          <Link href="/login" className="text-white mr-4">
            Login
          </Link>
          <Link href="/signup" className="text-white">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  )
}