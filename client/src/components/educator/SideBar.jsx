import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";
import { Folders, LayoutDashboard, SquarePlus, Users } from "lucide-react";

const SideBar = () => {
  const {isEducator} = useContext(AppContext);

  const menuItems = [
    {name: 'Dashboard', path: '/educator', icon: <LayoutDashboard />},
    {name: 'Add Course', path: '/educator/add-course', icon: <SquarePlus />},
    {name: 'My Courses', path: '/educator/my-courses', icon: <Folders />}, 
    {name: 'Student Enrolled', path: '/educator/students-enrolled', icon: <Users />},
  ];

  return isEducator && (
    <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col">
      {menuItems.map((item)=> (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === '/educator'}
          className={({isActive})=> `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive ? 'bg-green-50 border-r-[6px] border-green-500/90' : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'}`}
        >
          <span>{item.icon}</span>
          <p className="md:block hidden text-center">{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default SideBar;
