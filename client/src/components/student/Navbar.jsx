import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';



const Navbar = () => {

  const {navigate, isEducator} = useContext(AppContext);

  const isCourseListPage = location.pathname.includes('/course-list');

  const {openSignUp} = useClerk();
  const {user} = useUser();

  return (
    <div className="flex justify-between bg-[#1A2A80] p-3 px-5 sm:px-15">
      <div className="flex items-center gap-1">
        <img onClick={()=> navigate('/')} src="/icon.png" alt="logo" className="max-w-8"/>
        <h1 className="text-white font-bold text-lg">NeoroLearn</h1>
      </div>
      <div className="hidden md:flex items-center gap-3 text-white">
        {user &&
        <>
          <button  className='cursor-pointer' onClick={()=> {navigate('/educator')}}>{isEducator ? 'Educator Dashboard' : 'Become Educator '}</button>  
         | <Link to='/my-enrollments'>My Enrollments</Link>
          </>
         } 
        <div>
          { user ? <UserButton /> :
            <button onClick={()=> openSignUp()} className="bg-white py-2 px-3 rounded text-black cursor-pointer">Create Account</button>}
        </div>
      </div>
    </div>
  )
}

export default Navbar;
