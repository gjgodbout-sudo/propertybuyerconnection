export function currentFounderTier(now:Date=new Date()):'50'|'100'|'150'|'200'{
  const launchStr=process.env.LAUNCH_DATE||new Date().toISOString().slice(0,10)
  const launch=new Date(launchStr+'T00:00:00Z')
  const diffMonths=(now.getUTCFullYear()-launch.getUTCFullYear())*12+(now.getUTCMonth()-launch.getUTCMonth())
  if(diffMonths<2) return '50'; if(diffMonths<4) return '100'; if(diffMonths<6) return '150'; return '200'
}
export function tierToPriceId(t:'50'|'100'|'150'|'200'){
  if(t==='50') return process.env.STRIPE_PRICE_50!; if(t==='100') return process.env.STRIPE_PRICE_100!; if(t==='150') return process.env.STRIPE_PRICE_150!; return process.env.STRIPE_PRICE_200!
}
