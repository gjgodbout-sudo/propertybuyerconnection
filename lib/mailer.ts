import nodemailer from 'nodemailer'
export function makeTransport(){
  const host=process.env.SMTP_HOST, port=Number(process.env.SMTP_PORT||587), user=process.env.SMTP_USER, pass=process.env.SMTP_PASS
  if(!host||!user||!pass) throw new Error('SMTP env vars missing')
  return nodemailer.createTransport({ host, port, auth:{ user, pass } })
}
export async function sendEmail(to:string, subject:string, html:string){
  const from=process.env.SMTP_FROM||'no-reply@propertybuyerconnection.com'
  const t=makeTransport(); await t.sendMail({ from, to, subject, html })
}
