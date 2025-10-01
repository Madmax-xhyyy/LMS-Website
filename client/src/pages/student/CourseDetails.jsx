import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import { ChevronDown } from 'lucide-react';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import Youtube  from 'react-youtube';


const CourseDetails = () => {
  const {id} = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState([]);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {allCourses, calculateRating, calculateNoOfLectures, calculateCourseDuration, calculateChapterTime, currency} = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find(course => course._id === id)
    setCourseData(findCourse);
  }

useEffect(() => {
  fetchCourseData();
}, [allCourses])

const toggleSection = (index) => {
  setOpenSections((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
};

  return courseData ? (
    <>
    <div className='min-h-screen flex py-15 px-2 sm:py-18 sm:px-16 md:px-18'> 
      <div className='flex flex-col-reverse md:flex-row gap-4'>
        {/*Left column */}
        <div className='flex flex-col gap-4 px-4'>
          <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl'>{courseData.courseTitle}</h1>
          <p className='text-gray-600 text-sm sm:text-base' dangerouslySetInnerHTML={{__html: courseData.courseDescription.slice(0,200)}}></p>
          {/* review and ratings */}
          <div className="flex flex-col text-sm mb-2">
            <div className='flex items-center gap-1 mb-1'>
              <p className='text-xs sm:text-sm'>{calculateRating(courseData)}</p>
              <div className="flex ">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                    alt="star"
                    className="w-3.5 h-3.5"
                  />
                ))}
              </div>
              <p className="text-gray-500">({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? "ratings" : "rating"})</p>
              <p className="text-gray-500">{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? "Students" : "Student"}</p>
            </div>
              
              <p className='text-gray-500 mb-5'>Course by <span className='text-blue-600 underline'>NeuroLearn</span></p>
              <div>
                <h2 className='font-bold text-xl mb-1'>Course Structure</h2>
                <div className='flex flex-col gap-2'>
                  {courseData.courseContent.map((chapter, index) => (
                    <div key={index} className='border border-gray-300 bg-white rounded'>
                      <div className='flex items-center justify-between cursor-pointer select-none p-2' onClick={()=> toggleSection(index)}>
                        <div className='flex items-center gap-2'>
                          <span className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''}`}><ChevronDown /></span>
                          <p className='text-sm sm:text-base'>{chapter.chapterTitle}</p>
                        </div>
                        <p className='text-sm sm:text-base'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                        <ul className='list-disc md:pl-10 px-4 py-2 text-gray-700 border-t border-gray-300 text-xs sm:text-base'>
                          {chapter.chapterContent.map((lecture, i) => (
                          <li key={i} className="flex items-start gap-2 mb-2">
                            <img src={assets.play_icon} alt="Play icon" className='w-4 h-4 mt-1' />
                            <div className='flex items-center justify-between w-full text-gray-800'>
                              <p>{lecture.lectureTitle}</p>
                              <div className="text-xs sm:text-base text-gray-500 flex gap-2">
                                {lecture.isPreviewFree && <span onClick={()=> setPlayerData({
                                  videoId: lecture.lectureUrl.split('/').pop()
                                })} className="text-green-600 font-medium">Preview</span>}
                                <span>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</span>
                              </div>
                            </div>
                          </li>
                        ))}

                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='rich-text'>
              <h3>Course Description</h3>
              <p className='text-gray-600 pt-3' dangerouslySetInnerHTML={{__html: courseData.courseDescription}}></p>
            </div>
        </div>
        {/*Right column */}
        <div className='w-full flex justify-center'>
          <div className='border max-w-11/12'>

          {
             playerData ? 
                  <Youtube videoId={playerData.videoId} opts={{playerVars: {autoplay : 1}}} iframeClassName='w-full aspect-video'/>
                  : <img src={courseData.courseThumbnail} alt="Course thumbnail" />
          }
            
            <div className='p-4'>
              <div className='flex items-center gap-2'>
                <img className='w-3.5' src={assets.time_left_clock_icon} alt="time" />
                <p className='text-red-500'><span className='font-medium'>5 Days</span> left at this price!</p>
              </div>
              <div className='flex gap-3 items-center pt-2'>
                <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>{currency}{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
                <p className='md:text-lg text-gray-500 line-through'>{currency}{courseData.coursePrice}</p>
                <p className='md:text-lg text-gray-500'>{courseData.discount}% off</p>
              </div>
              <div className='flex items-center gap-4 text-gray-600 mt-2'>
                <div className='flex items-center gap-1'>
                  <img src={assets.star} alt="star icon" />
                  <p>{calculateRating(courseData)}</p>
                </div>
                <div className="h-4 w-px bg-gray-500/40"></div>
                <div className='flex flex-nowrap items-center gap-1'>
                  <img src={assets.time_clock_icon} alt="clock icon" />
                  <p className='text-xs sm:text-base text-nowrap'>{calculateCourseDuration(courseData)}</p>
                </div>
                <div className="h-4 w-px bg-gray-500/40"></div>
                <div className='flex flex-nowrap items-center gap-1'>
                  <img src={assets.lesson_icon} alt="clock icon" />
                  <p className='text-xs sm:text-base text-nowrap'>{calculateNoOfLectures(courseData)} lessons</p>
                </div>
              </div>
              <button className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-800 text-white font-bold'>{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>
              <div className='mt-5 p-5'>
                <p className='font-semibold mb-1'>What's in the course?</p>
                <ul className='list-disc text-sm text-gray-600'>
                  <li>Lifetime access with free updates.</li>
                  <li>Step-by-step, hands on projects guidance.</li>
                  <li>Downloadable resources and source code.</li>
                  <li>Quizzes to test your knowledge.</li>
                  <li>Certificate of completion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  ) : <Loading />
};

export default CourseDetails;
