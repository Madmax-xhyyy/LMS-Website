import {Link} from 'react-router-dom'
import {ArrowRight} from 'lucide-react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

const CourseSection = () => {
  const { allCourses } = useContext(AppContext)

  return (
    <div className='flex flex-col text-center justify-center max-w-9/10 mb-20'>
      <h2 className='text-xl font-bold sm:text-3xl mb-4'>Explore Featured Courses</h2>
      <p className='text-gray-600 sm:text-lg'>Choose from a wide range of high-quality courses designed to help you grow.</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:flex sm:gap-4 gap-2 my-10'>
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
      <Link to={'/course-list'} onClick={() => scrollTo(0, 0)} className='text-gray-600 flex justify-center items-center gap-1 underline'>
        See all Courses <ArrowRight size={16} />
      </Link>
    </div>
  )
}

export default CourseSection
