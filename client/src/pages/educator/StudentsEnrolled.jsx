import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

//Get Students Enrolled Data
const StudentsEnrolled = () => {
  const {backendUrl, getToken, isEducator} = useContext(AppContext);
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async ()=> {
    try{
      const token = await getToken();
      const {data} = await axios.get(`${backendUrl}/api/educator/enrolled-students`, {headers: {Authorization: `Bearer ${token}`}});

      if(data.success){
        setEnrolledStudents(data.enrolledStudents.reverse());
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  useEffect(()=> {
    if(isEducator){
      fetchEnrolledStudents();
    }
  }, [isEducator]);

  return (
    <div className="min-h-screen flex flex-col items-start jutify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full">
        <h1 className="pb-4 text-lg font-bold">Students Enrolled</h1>
        <div className="overflow-x-scroll w-auto border border-gray-500/20 rounded">
          <table className="table-auto md:table-fixed w-full ">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm">
              <tr>
                <th className="text-start px-4 py-3 font-semibold">#</th>
                <th className="text-start px-4 py-3 font-semibold text-nowrap">Student Name</th>
                <th className="text-start px-4 py-3 font-semibold text-nowrap">Course Title</th>
                <th className="text-start px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {enrolledStudents && enrolledStudents.length > 0 ? (
                enrolledStudents.map((item, index) => (
                  <tr key={index} className="border-b border-gray-500/20">
                    <td className="px-4 py-3 text-center">
                      {index + 1}
                    </td>
                    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                      <img
                        src={item?.student?.imageUrl}
                        alt="profile"
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="text-nowrap">{item?.student?.name}</span>
                    </td>
                    <td className="px-4 py-3 text-nowrap">{item?.courseTitle}</td>
                    <td className="px-4 py-3 text-nowrap">
                      {new Date(item?.purchaseDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-3 text-gray-500">
                    No Enrolled Students Found.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StudentsEnrolled
