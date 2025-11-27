import { prisma } from '@/lib/db'

async function main() {
  const id =
    process.env.DEMO_AGENT_ID ||
    '00000000-0000-0000-0000-000000000001'

  const db = prisma as any

  await db.agent.upsert({
    where: { id },
    create: {
      id,
      full_name: 'Demo Agent',
      email: 'demo.agent@example.com',
      country: 'CA',
      subscription_status: 'active',
      verification: 'approved',
    },
    update: {},
  })
}

main()
  .then(() => {
    console.log('Seed completed.')
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
