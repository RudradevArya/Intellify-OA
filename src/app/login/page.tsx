import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.auth.signIn({ email, password })
      if (error) throw error
      router.push('/dashboard')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">
        Log In
      </button>
    </form>
  )
}