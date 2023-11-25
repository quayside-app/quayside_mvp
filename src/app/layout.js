import './globals.css'
import LeftSidebar from '../components/LeftSidebar'
import Navbar from '../components/Navbar'
import NewProjectModal from '../components/NewProjectModal'
import { ApiResponseProvider } from './ApiResponseContext'
import { getServerSession } from 'next-auth/next'
import { Provider } from './client-provider'
import { options } from './api/auth/[...nextauth]/options'

export const metadata = {
  title: 'quayside',
  description: 'What is next?'
}
async function RootLayout ({ children }) {
  // Allows us to use useSession inside of client components
  const session = await getServerSession(options)
  return (

    <ApiResponseProvider>
      <html lang='en'>

        <body className=''>

          <Provider session={session}>

            <div className=''>
              <NewProjectModal />
              <Navbar />
              <div className='flex h-screen'>
                <LeftSidebar className='w-96 lg:w-56' />
                <div className='flex w-max ml-5'> {children} </div>
              </div>
            </div>
          </Provider>
        </body>

      </html>
    </ApiResponseProvider>
  )
}

export default RootLayout
