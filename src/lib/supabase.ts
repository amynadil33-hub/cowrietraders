import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://ktunhsrivkkyghaauffr.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijg3YTJkNGY3LTE5YzMtNGVjNi04NmZjLWIyYzE2ZDFjMDU4NiJ9.eyJwcm9qZWN0SWQiOiJrdHVuaHNyaXZra3lnaGFhdWZmciIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc4NTI1MzE2LCJleHAiOjIwOTM4ODUzMTYsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.eITtHNhZdTbDPBXlmhWNaGvyPPTYdiGnVDxkPmAhXKM';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };