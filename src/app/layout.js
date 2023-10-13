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
            <div className='flex min-h-screen h-screen'>
              <LeftSidebar className='flex w-1/2 lg:w-1/6 resize-x h-screen' />
              <div className='flex w-1/2 lg:w-5/6  ml-5'> {children} </div>
            </div>
          </div>
        </body>

      </html>
    </ApiResponseProvider>
  )
}

export default RootLayout
