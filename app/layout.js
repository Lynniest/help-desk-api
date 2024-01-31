import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/shared/navBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Help Desk Mailing',
  description: 'Sending emails to users for password reset and account verification.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-custom-bg`}>
        <NavBar/>
        {children}
        </body>
    </html>
  )
}
