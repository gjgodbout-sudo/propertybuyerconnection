import webpush from 'web-push'
function ensureConfigured(){
  const pub=process.env.VAPID_PUBLIC_KEY, priv=process.env.VAPID_PRIVATE_KEY, email=process.env.VAPID_CONTACT||'mailto:admin@propertybuyerconnection.com'
  if(!pub||!priv) throw new Error('VAPID keys missing')
  webpush.setVapidDetails(email, pub, priv)
}
export async function sendPush(subscription:any, payload:any){
  ensureConfigured()
  const data=typeof payload==='string'?payload:JSON.stringify(payload)
  await webpush.sendNotification(subscription, data)
}
