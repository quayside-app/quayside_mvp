
import NewProjectButton from '../components/NewProjectButton'

import Dropdown from '../components/Dropdown'
import Button from '../components/Button'
import ContactUsModal from '../components/ContactUsModal'

import plusIcon from '../../public/svg/plus.svg'
import starIcon from '../../public/svg/star.svg'
import tableIcon from '../../public/svg/table.svg'
import teamIcon from '../../public/svg/team.svg'
import targetIcon from '../../public/svg/target.svg'

import mongoose from 'mongoose';
import {User, Project} from '../api/mongoModels';
import {URI} from '../api/mongoData.js';

async function getProjects() {
    try {

      // Connect if not connected already
      if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);

      let user = await User.findOne({firstName: 'Mya'});

      if (user) {
        let userID = user._id;

        let projects = await Project.find({ userIDs: userID });

        return (
          <div>
            <ul>
              {projects.map((project, index) => (
                <li key={index} className=" font-light text-sm"> <Button label={project.name}/></li>
              ))}
            </ul>
          </div>
        );
      }
  
      // If no data return empty
      return (<div></div>);

  } catch (error) {
      console.error('Error fetching data:', error);
      return "Error";
  }
}


/**
 * Represents the left sidebar component.
 * @returns {JSX.Element} The rendered component.
 */

export default async function LeftSidebar ({ className }) {
  const projects = await getProjects();  const [isContactModalOpen, setContactModalOpen] = useState(false)

  const handleContactClick = () => {
    setContactModalOpen(true)
    console.log('Contact Us clicked')
  }

  return (
    <div className={`${className} flex flex-col h-screen flex-shrink-0 flex-grow-0 w-48`}>
      <ContactUsModal isOpen={isContactModalOpen} handleClose={() => setContactModalOpen(false)} />
      <div className='flex-grow flex bg-neutral-800 text-white justify-center py-5 overflow-y-auto'>

        <div className='flex flex-wrap mx-4'>
          <ul className='font-medium'>
            <li> <span className='ml-3 flex justify-center py-5'>Directory</span> </li>
            <NewProjectButton/>
            <li> <Button label='Task' imagePath={plusIcon} /> </li>

            <li><div className='my-10 space-y-2 font-medium border-t  border-gray-200' /></li>

            <li> <Dropdown label='Starred' imagePath={starIcon} /> </li>
            <li> <Dropdown label='Projects' imagePath={tableIcon} /> </li>
            <li> {projects}</li>
            <li> <Dropdown label='Team' imagePath={teamIcon} /> </li>
            <li> <Dropdown label='Objectives' imagePath={targetIcon} /> </li>
          </ul>

          <div className='pt-4 my-10 space-y-2 font-medium border-t border-gray-200' />
        </div>
      </div>
      {/* Contact Us Button */}
      <div className='sticky bottom-0 flex-shrink-0 p-2'>
        <button
          type='button'
          className='flex justify-center items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-700'
          onClick={handleContactClick}
        >
          <span className='flex my-auto ml-3 text-left whitespace-nowrap text-xs xl:text-lg'>Contact Us</span>
        </button>
      </div>
    </div>
  )
}
