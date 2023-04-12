const createClient = require('@supabase/supabase-js').createClient

const supabase = createClient('https://ljgxgthkrhotatmewxcs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqZ3hndGhrcmhvdGF0bWV3eGNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyOTAxOTcsImV4cCI6MTk5Njg2NjE5N30.QyfnXlgMuYQm5rljtkYaEnW2CR6-9YpdNFa-fy64Ips');

// console.log(supabase)

module.exports = supabase;