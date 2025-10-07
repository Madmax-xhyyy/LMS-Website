import { assets } from "../../assets/assets";
import { UserButton, useUser } from '@clerk/clerk-react';
import { GraduationCap } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between px-6 md:px-10 border-b border-gray-500 py-4 md:py-6">
      <NavLink to='/' className='font-bold flex gap-1'><GraduationCap /> <span className="hidden md:flex">NeuroLearn</span></NavLink>
      <div className="flex items-center gap-2 text-gray-500 relative">
        <p className="text-xs md:text-sm">Hi! {user ? user.fullName : 'Developer'}</p>
        {user ? <UserButton/> : <img className="max-w-80" src={assets.profile_img}/>}
      </div>
    </div>
  )
}

export default Navbar;
