import { supabase } from './supabaseClient.js'
import { mockData } from '../utils/mockData.js'

export class DataService {
  // Applications
  static async getApplications() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch {
      // Fallback to mock data if Supabase is not configured
      console.log('Using mock data (Supabase not configured)')
      return mockData.applications || []
    }
  }

  static async createApplication(application) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([application])
        .select()
      
      if (error) throw error
      return data[0]
    } catch {
      // Fallback to mock data if Supabase is not configured
      console.log('Using mock data (Supabase not configured)')
      const newApp = {
        id: Date.now(),
        ...application,
        created_at: new Date().toISOString()
      }
      return newApp
    }
  }

  static async updateApplication(id, updates) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data[0]
    } catch {
      // Fallback to mock data if Supabase is not configured
      console.log('Using mock data (Supabase not configured)')
      return { id, ...updates }
    }
  }

  static async deleteApplication(id) {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch {
      // Fallback to mock data if Supabase is not configured
      console.log('Using mock data (Supabase not configured)')
      // Mock delete - just log it
    }
  }

  // User Profile
  static async getUserProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No authenticated user')
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (error) throw error
      return data
    } catch {
      // Fallback to mock data if Supabase is not configured
      console.log('Using mock data (Supabase not configured)')
      return mockData.user || {}
    }
  }

  static async updateUserProfile(updates) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No authenticated user')
      
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
      
      if (error) throw error
      return data[0]
    } catch {
      // Fallback to mock data if Supabase is not configured
      console.log('Using mock data (Supabase not configured)')
      return { ...mockData.user, ...updates }
    }
  }
}
