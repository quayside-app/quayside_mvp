


// import Image from 'next/image' //'Image' is defined but never used. (no-unused-vars)
// import { useState } from 'react' //'useState' is defined but never used. (no-unused-vars)
// import cookieCutter from 'cookie-cutter' //'cookieCutter' is defined but never used. (no-unused-vars)
import TreeGraph from '../components/Graph'
import DataDisplay from '../components/User'


export default function Home () {
  return (
    <main className='flex flex-wrap w-full flex-col items-center'>
      <div className='flex w-full flex-wrap items-center'>
        <DataDisplay/>
        <div className='w-full'><TreeGraph /></div>
        
      </div>
      
    </main>
  )
}
