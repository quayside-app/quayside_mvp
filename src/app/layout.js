import './globals.css'
import LeftSidebar from '../components/LeftSidebar'
import Navbar from '../components/Navbar'
import NewProjectModal from '../components/NewProjectModal'
import { Inter } from 'next/font/google'
import { ApiResponseProvider } from './ApiResponseContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'quayside',
  description: 'What is next?'
}
function RootLayout ({ children }) {
  return (
    <ApiResponseProvider>
      <html lang='en'>

        <body className={inter.className}>

          <div className=''>
            <NewProjectModal />
            <Navbar />
            <div className='flex h-screen'>
              <LeftSidebar className='flex w-1/3 md:w-60' />
              <div className='flex w-2/3 md:w-max  ml-5'> {children} </div>
            </div>
          </div>
        </body>

      </html>
    </ApiResponseProvider>
  )
}

export default RootLayout
