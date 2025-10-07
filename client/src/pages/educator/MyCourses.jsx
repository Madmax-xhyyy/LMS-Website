import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import Loading from "../../components/student/Loading";
import axios from "axios";
import { toast } from "react-toastify";

const MyCourses = () => {
  const {currency, backendUrl, isEducator, getToken} = useContext(AppContext);
  const [courses, setCourses] = useState([]);

  const fetchAllCourses = async ()=> {
    try{
      const token = await getToken();
      const {data} = await axios.get(`${backendUrl}/api/educator/courses`, {headers: {Authorization: `Bearer ${token}`}});

      data.success && setCourses(data.courses);

    }catch(error){
      toast.error(error.message);
    }
  }

  useEffect(()=> {
    if(isEducator){
      fetchAllCourses();
    }
  }, [isEducator]);

  return  (
    <div className="min-h-screen flex flex-col items-start jutify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full">
        <h1 className="pb-4 text-lg font-bold">My Courses</h1>
        <div className="overflow-x-scroll w-auto border border-gray-500/20 rounded">
          <table className="table-auto md:table-fixed w-full">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm">
              <tr>
                <th className="px-4 py-3 font-semibold text-nowrap text-start">All Courses</th>
                <th className="px-4 py-3 font-semibold text-nowrap text-start">Earnings</th>
                <th className="px-4 py-3 font-semibold text-nowrap text-start">Students</th>
                <th className="px-4 py-3 font-semibold text-nowrap text-start">Published On</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {courses && courses.length > 0 ? (courses.map((course)=> (
                <tr key={course._id} className="border-b border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex space-x-3 items-center">
                    <img src={course.courseThumbnail} alt="course image" className="w-16" />
                    <span className="truncate">{course.courseTitle}</span>
                  </td> 
                  <td className="px-4 py-3 text-nowrap">
                    {currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}
                  </td>
                  <td className="px-4 py-3 text-nowrap">{course.enrolledStudents.length}</td>
                  <td className="px-4 py-3 text-nowrap">{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              )) ): (
                <tr>
                  <td colSpan="4" className="text-center py-3 text-gray-500">No Courses Found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  ) 
}

export default MyCourses
