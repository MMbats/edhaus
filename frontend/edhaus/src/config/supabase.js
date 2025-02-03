import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://htzplnnhbjwzepxsrqzh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0enBsbm5oYmp3emVweHNycXpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5ODQ1NjEsImV4cCI6MjA1MzU2MDU2MX0.SqJHV-qQkEfp07V9GVxvmWyfTgxQMtcIx72G_sI1RMQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
