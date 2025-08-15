import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock Supabase client if environment variables are missing
let supabase
if (!supabaseUrl || !supabaseAnonKey) {
  console.log('Supabase environment variables not found, using mock client')
  // Mock Supabase client for development
  supabase = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ error: new Error('Mock: Sign in not configured') }),
      signUp: async () => ({ error: new Error('Mock: Sign up not configured') }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({ order: () => ({}) }),
      insert: () => ({ select: () => ({}) }),
      update: () => ({ eq: () => ({ select: () => ({}) }) }),
      delete: () => ({ eq: () => ({}) })
    })
  }
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

export { supabase }

// Secure helper functions
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
