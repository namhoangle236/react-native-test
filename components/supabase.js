import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = 'https://jkpvtzfunmwnhskhhryp.supabase.co'
const supabaseKey  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprcHZ0emZ1bm13bmhza2hocnlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNjQ4MzEsImV4cCI6MjA2Mjg0MDgzMX0.u6yDCLdYMdZLAaFHBU84nsVyne4dYUIjXPRvJisb4aw'
export const supabase = createClient(supabaseUrl, supabaseKey)
