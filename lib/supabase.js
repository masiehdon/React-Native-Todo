import 'react-native-url-polyfill/auto'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ftdrdqfasbslraquacvw.supabase.co"
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0ZHJkcWZhc2JzbHJhcXVhY3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxMzk3MzYsImV4cCI6MjAyMjcxNTczNn0.WnEh6a5lMfBHLiGaeEEuX9Qmj0MQ6reBTu68I6PIw3E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

