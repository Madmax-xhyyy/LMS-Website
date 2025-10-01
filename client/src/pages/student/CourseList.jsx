import { useContext, useState, useEffect } from "react"
import { AppContext } from "../../context/AppContext"
import SearchBar from "../../components/student/SearchBar"
import { useParams } from "react-router-dom"
import CourseCard from "../../components/student/CourseCard"
import { X } from 'lucide-react'
import Footer from "../../components/student/Footer"

const CourseList = () => {
  const {navigate, allCourses} = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect (()=> {
    if(allCourses && allCourses.length > 0){
      const tempCourses = allCourses.slice()

      input ?
        setFilteredCourse(
          tempCourses.filter(
            item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        )
      : setFilteredCourse(tempCourses)
    }
  },[allCourses, input])

  return (
    <>
    <div className="flex flex-col justify-center py-20 px-8 sm:px-22 md:px-36">
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className="flex flex-col gap-1 mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Course List</h1>
          <p className="text-xs sm:text-base"><span className="text-blue-600 cursor-pointer" onClick={()=> navigate('/')}>Home</span> / <span className="text-gray-600 ">Course List</span></p>
        </div>
        <SearchBar data={input} />
      </div>
      {input && <div className="mt-10">
        <div className="flex gap-4 px-3 py-2 border border-gray-600 rounded text-gray-600 w-fit items-center">
          <p className="text-black">{input}</p>
          <span onClick={()=> navigate('/course-list')}><X /></span>
        </div>
       
        
      </div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
        {filteredCourse.map((course, index)=> <CourseCard key={index} course={course}/>)}
      </div>
    </div>
    <Footer />
    </>
  )
}

export default CourseList
