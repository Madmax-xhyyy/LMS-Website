import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CourseSection from '../../components/student/CourseSection'
import TestimonialSection from '../../components/student/TestimonialSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'

const Home = () => {
  return (
    <div className='min-h-screen pt-26'>
      <div className='flex flex-col items-center px-4 sm:px-12'>
        <Hero />
        <Companies />
        <CourseSection />
        <TestimonialSection />
        <CallToAction />

      </div>
      <Footer />
    </div>
  )
}

export default Home
