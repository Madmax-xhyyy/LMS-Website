import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'; // Make sure this import path is correct

const CourseCard = ({ course }) => {
  const { currency, calculateRating, } = useContext(AppContext);

  const discountedPrice = (
    course.coursePrice -
    (course.discount * course.coursePrice) / 100
  ).toFixed(2);

  return (
    <Link to={`/course/${course._id}`} onClick={() => scrollTo(0, 0)}>
      <div className="rounded-lg overflow-hidden shadow-md border h-full w-full max-w-sm bg-white hover:shadow-lg transition-shadow duration-300">
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="w-full object-cover"
        />
        <div className="p-2 sm:p-4 flex flex-col justify-between text-start">
          <div className="flex-1">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1">
              {course.courseTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
               
            </p>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center gap-1 text-sm mb-2">
              <p className='text-xs sm:text-sm'>{calculateRating(course)}</p>
              <div className="flex ">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                    alt="star"
                    className="w-3.5 h-3.5"
                  />
                ))}
              </div>
              <p className="text-gray-500">{course.courseRatings.length}</p>
            </div>
            <p className="text-sm sm:text-base font-bold text-gray-800">
              {currency}
              {discountedPrice}
            </p>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
