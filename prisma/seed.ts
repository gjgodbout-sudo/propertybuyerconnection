import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main(){
  const id = process.env.DEMO_AGENT_ID || '00000000-0000-0000-0000-000000000001'
  await prisma.agent.upsert({
    where:{ id },
    create:{ id, full_name:'Demo Agent', email:'demo.agent@example.com', country:'CA', subscription_status:'active', verification:'approved' },
    update:{}
  })
  console.log('Seeded Demo Agent', id)
}
main().finally(()=>prisma.$disconnect())
