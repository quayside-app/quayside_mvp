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

        <body>

          <Provider session={session}>

            <div className=''>
              <NewProjectModal />
              <Navbar className='fixed inset-x-0 z-30'/>

                <LeftSidebar className='fixed mt-12 w-44 inset-y-0 z-20' />
                <div className='fixed w-full mt-12 pl-44'>
                  <div className='h-screen' style={{backgroundImage: "url('/background.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}> {children} </div>
                </div>
            </div>
          </Provider>
        </body>

      </html>
    </ApiResponseProvider>
  )
}

export default RootLayout
