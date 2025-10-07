import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GraduationCap } from 'lucide-react';



const Navbar = () => {

  const {navigate, isEducator, backendUrl, setIsEducator, getToken} = useContext(AppContext);

 //const isCourseListPage = location.pathname.includes('/course-list');

  const {openSignUp} = useClerk();
  const {user} = useUser();

  const becomeEducator = async()=> {
    try{
      if(isEducator){
        navigate('/educator');
        return;
      }
      const token = await getToken();
      const {data} = await axios.get(backendUrl + '/api/educator/update-role', {headers: {Authorization: `Bearer ${token}`}});

      if(data.success){
        setIsEducator(true);
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  return (
    <div className="flex justify-between bg-green-900 p-3 px-5 sm:px-15">
      <div className="flex items-center gap-1">
        <Link to='/'>
        <h1 className="text-white font-bold text-lg flex gap-1 items-center"><GraduationCap color="#ffffff" /> NeoroLearn</h1>
        </Link> 
      </div>
      <div className="hidden md:flex items-center gap-3 text-white">
        {user &&
        <>
          <button  className='cursor-pointer' onClick={becomeEducator}>{isEducator ? 'Educator Dashboard' : 'Become Educator '}</button>  
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
