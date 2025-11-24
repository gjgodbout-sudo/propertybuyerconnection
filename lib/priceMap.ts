export function mapPriceIdToTier(priceId: string): '50'|'100'|'150'|'200' {
  if (priceId === process.env.STRIPE_PRICE_50) return '50'
  if (priceId === process.env.STRIPE_PRICE_100) return '100'
  if (priceId === process.env.STRIPE_PRICE_150) return '150'
  return '200'
}
export function mapStripeStatus(s: string): 'active'|'past_due'|'canceled' {
  if (s === 'active' || s === 'trialing') return 'active'
  if (s === 'past_due' || s === 'incomplete' || s === 'incomplete_expired' || s === 'unpaid') return 'past_due'
  return 'canceled'
}
