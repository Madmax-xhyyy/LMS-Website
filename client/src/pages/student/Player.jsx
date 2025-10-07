import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/student/Footer'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Youtube  from 'react-youtube';
import Rating from '../../components/student/Rating';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const Player = () => {
  const {enrolledCourses, calculateChapterTime, backendUrl, getToken, userData, fetchUserEnrolledCourses} = useContext(AppContext);
  const {courseId} = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const toggleSection = (index) => {
  setOpenSections((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
  };


  const getCourseData = ()=> {
    enrolledCourses.map((course)=>{
      if(course._id === courseId){
        setCourseData(course);
        course.courseRatings.map((item)=> {
          if(item.userId === userData._id){
            setInitialRating(item.rating);
          }
        })
      }
    })
  }

  useEffect(()=> {
    if(enrolledCourses.length > 0){
      getCourseData();
    }
  }, [enrolledCourses]);

  const markLectureCompleted = async (lectureId)=> {
    try{
      const token = await getToken();
      const {data} = await axios.post(`${backendUrl}/api/user/update-course-progress`, {courseId, lectureId}, {headers: {Authorization: `Bearer ${token}`}});

      if(data.success){
        toast.success(data.message);
        getCourseProgress();
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  const getCourseProgress = async()=> {
    try{
      const token = await getToken();
      const {data} = await axios.post(`${backendUrl}/api/user/get-course-progress`, {courseId}, {headers: {Authorization: `Bearer ${token}`}});

      if(data.success){
        setProgressData(data.progressData);
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  const handleRate = async (rating)=> {
    try{
      const token = await getToken();
      const {data} = await axios.post(`${backendUrl}/api/user/add-rating`, {courseId, rating}, {headers: {Authorization: `Bearer ${token}`}});

      if(data.success){
        fetchUserEnrolledCourses(); 
      }else{
        toast.error(data.message);
      }

    }catch(error){
      toast.error(error.message);
    }
  }

  useEffect(()=> {
    getCourseProgress();
  }, [])
  return courseData ? (
    <>
      <div className='min-h-screen flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        {/*Left Column */}
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
           <div className='flex flex-col gap-2'>
            {courseData && courseData.courseContent.map((chapter, index) => (
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
                      <img src={ progressData && progressData.lectureCompleted.includes(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon} alt="Play icon" className='w-4 h-4 mt-1' />
                      <div className='flex items-center justify-between w-full text-gray-800'>
                        <p>{lecture.lectureTitle}</p>
                        <div className="text-xs sm:text-base text-gray-500 flex gap-2">
                          {lecture.lectureUrl && <span onClick={()=> setPlayerData({
                            ...lecture, chapter: index + 1,lecture: i + 1
                          })} className="text-green-600 font-medium cursor-pointer">Watch</span>}
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
          <div className='flex items-center gap-2 py-3 mt-10'>
            <h2 className='text-xl font-bold'>Rate this course:</h2>
            <Rating initialRating={initialRating} onRate={handleRate}/>
          </div>
        </div>
        {/*Right Column */}
        <div className='md:mt-10'>
          {playerData ? (
            <div>
              <Youtube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video'/>
              <div className='flex justify-between items-center mt-1'>
                <p>{playerData.chapter}.{playerData.lecture } {playerData.lectureTitle}</p>
                <button onClick={()=> markLectureCompleted(playerData.lectureId)} className='text-blue-600'>{progressData && progressData.lectureCompleted.includes(playerData.lectureId) ? 'Completed' : 'Mark complete' }</button>
              </div>
            </div>
          )
          : <img src={courseData ? courseData.courseThumbnail : null } alt="" />
          }
        </div>
      </div>
      <Footer />
    </>
  ) : <Loading />
}

export default Player
