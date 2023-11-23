'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation';

import NewProjectButton from '../components/NewProjectButton'
import ContactUsButton from '../components/ContactUsButton'

import Dropdown from '../components/Dropdown'
import Button from '../components/Button'

import plusIcon from '../../public/svg/plus.svg'
import starIcon from '../../public/svg/star.svg'
import tableIcon from '../../public/svg/table.svg'
import teamIcon from '../../public/svg/team.svg'
import targetIcon from '../../public/svg/target.svg'

/**
 * A LeftSidebar component that fetches project data associated with a specified user ID and renders a list of project names as buttons.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.className - A string of class names to be applied to the component.
 *
 * @returns {React.Element} - The rendered sidebar element containing a list of project names as buttons.
 *
 * @example
 * // Importing the component
 * import LeftSidebar from './LeftSidebar';
 *
 * // Using the component
 * <LeftSidebar className="custom-class" />
 *
 * @property {string} userID - The user ID whose projects are to be retrieved and displayed. Currently hardcoded, to be replaced with dynamic data.
 */
export default function LeftSidebar ({ className }) {
  const [projectsDiv, setProjectsDiv] = useState(<div />);
  const { data: session } = useSession();
  let pathname = usePathname()

  useEffect(() => {
    // Fetch project data
    fetch(`/api/mongoDB/getProjects?userID=${session.userId}`, {
      method: 'GET',
    }).then(async (response) => {
      const body = await response.json()
      if (!response.ok) {
        console.error(body.message)
      } else {
        setProjectsDiv(
          <div>
            <ul>
              {body.projects.map((project, index) => (
                <li key={index} className=' font-light text-sm'>
                  <Link href={`/${project._id}`}><Button label={project.name}/></Link>
                </li>
              ))}
            </ul>
          </div>
        )
      }
    }).catch(error => {
      console.error('Left sidebar Project warning:', error)
    })
  }, [pathname]) // Changes when path changes or on load

  return (
    <div className={className}>
      <div className='flex flex-wrap'>

        <div className='max-w-[200px] bg-neutral-800 px-4 pt-10 min-h-screen  text-white justify-center'>
          <ul className='font-medium'>
            <NewProjectButton />
            <li> <Button label='Task' imagePath={plusIcon} /> </li>

            <li><div className='my-10 space-y-2 font-medium border-t  border-gray-200' /></li>

            <li> <Dropdown label='Starred' imagePath={starIcon} /> </li>
            <li> <Dropdown label='Projects' imagePath={tableIcon} /> </li>
            <li> {projectsDiv}</li>
            <li> <Dropdown label='Team' imagePath={teamIcon} /> </li>
            <li> <Dropdown label='Objectives' imagePath={targetIcon} /> </li>
          </ul>
        </div>

        <div className='mt-auto sticky bottom-0 bg-neutral-700 w-full'>
          <ContactUsButton />
        </div>
      </div>
    </div>
  )
}
