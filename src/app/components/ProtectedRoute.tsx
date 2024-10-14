import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function withAuth(WrappedComponent) {
  return function ProtectedRoute(props) {
    const router = useRouter()
    const supabase = createClientComponentClient()

    useEffect(() => {
      const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
        }
      }
      checkUser()
    }, [])

    return <WrappedComponent {...props} />
  }
}