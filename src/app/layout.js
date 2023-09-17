import './globals.css'
import LeftSidebar from '../components/LeftSidebar';
import Navbar from '../components/Navbar';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'quayside',
  description: 'What is next?',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Navbar />
      
      <body className={inter.className}>
        <LeftSidebar />
        {children}
      </body>

    </html>
  )
}
