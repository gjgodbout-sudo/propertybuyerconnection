import './globals.css'
import type { ReactNode } from 'react'
export const metadata={title:'PropertyBuyerConnection',description:'Connect buyers to agents’ listings fast'}
export default function RootLayout({children}:{children:ReactNode}){
  return(<html lang='en'><body>
    <header className='border-b bg-white'>
      <div className='container py-4 flex items-center justify-between'>
        <div className='font-semibold flex items-center gap-2'>
          <img src='/pbc-logo.svg' className='h-6' alt='PBC'/>
          PropertyBuyerConnection
        </div>
        <nav className='space-x-4'>
          <a className='btn' href='/map'>Map Search</a>
          <a className='btn' href='/founder'>Pricing</a>
          <a className='btn' href='/agents/dashboard'>For Agents</a>
          <a className='btn-primary' href='/'>Find Properties</a>
        </nav>
      </div>
    </header>
    <main className='container py-8'>{children}</main>
  </body></html>)
}
