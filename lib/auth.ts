import { cookies } from 'next/headers'
export function getCurrentAgentId(){
  const jar = cookies()
  return jar.get('agentId')?.value || process.env.DEMO_AGENT_ID || '00000000-0000-0000-0000-000000000001'
}
