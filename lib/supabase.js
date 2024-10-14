import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const signUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({ email, password })
    return { user, error }
  }
  
  export const signIn = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password })
    return { user, error }
  }
  
  export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }
  
  export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
  

  export const getMetrics = async () => {
    console.log('Fetching metrics')
    const { data, error } = await supabase
      .from('dashboard_metrics')
      .select('*')
    
    if (error) {
      console.error('Error fetching metrics:', error)
      throw error
    }
    
    if (!data) {
      console.log('No metrics found')
      return []
    }
    
    console.log('Metrics fetched successfully:', data)
    return data
  }


  export const insertMetric = async (metric_name, metric_value) => {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError) {
    console.error('Error getting current user:', userError)
    throw userError
  }

  if (!user) {
    console.error('No user found')
    throw new Error('User not authenticated')
  }
  
  console.log('Inserting metric:', { metric_name, metric_value, user_id: user.id })
  const { data, error } = await supabase
    .from('dashboard_metrics')
    .insert([{ metric_name, metric_value: parseFloat(metric_value), user_id: user.id }])
  
  if (error) {
    console.error('Error inserting metric:', error)
    throw error
  }
  
  console.log('Metric inserted successfully:', data)
  return data
}