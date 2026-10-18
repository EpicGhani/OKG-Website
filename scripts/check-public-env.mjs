import { loadEnv } from 'vite'
import { readFile } from 'node:fs/promises'

const env = loadEnv('production', process.cwd(), 'VITE_')
const key = env.VITE_SUPABASE_ANON_KEY ?? ''
let publicKey = key.startsWith('sb_publishable_')
if (key.split('.').length === 3) {
  try { publicKey = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString()).role === 'anon' } catch { publicKey = false }
}
if (!publicKey) throw new Error('Build stopped: VITE_SUPABASE_ANON_KEY must be a public anon/publishable key, never a secret or service-role key.')
const origin = new URL(env.VITE_SUPABASE_URL).origin
if (!origin.startsWith('https://')) throw new Error('Production Supabase must use HTTPS.')
const config = JSON.parse(await readFile('vercel.json', 'utf8'))
const csp = config.headers[0].headers.find(h => h.key === 'Content-Security-Policy').value
const connections = csp.split(';').find(d => d.trim().startsWith('connect-src ')).trim().split(/\s+/).slice(1)
if (!connections.includes(origin)) throw new Error('Update the Supabase origin in vercel.json connect-src before building for this project.')
console.log('Public environment and production connection policy checked.')
