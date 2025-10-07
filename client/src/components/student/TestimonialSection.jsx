import { assets, dummyTestimonial } from '../../assets/assets'


const TestimonialSection = () => {
  return (
    <div className='flex flex-col text-center gap-10 max-w-9/10 mb-30'>
      <div>
        <h2 className='text-xl font-bold sm:text-3xl mb-4'>What Our Learners Say</h2>
        <p className='text-gray-600 sm:text-lg'>Hear from students who’ve taken our courses and how it changed their learning journey.</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {dummyTestimonial.map((testimonial, index)=> (
          <div key={index} className='text-xs text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] overflow-hidden'>
            <div className='flex items-center gap-4 p-5 bg-gray-500/10 '>
              <img className='h-12 w-12 rounded-full' src={testimonial.image} alt={testimonial.name} />
              <div>
                <h1 className='font-bold text-base sm:text-lg'>{testimonial.name}</h1>
                <p className='text-gray-700 text-sm sm:text-base'>{testimonial.role}</p>
              </div>
            </div>
            <div className='p-5 pb-7'>
                <div className='flex gap-0.5'>
                  {[...Array(5)].map((_, i)=>(
                    <img className='h-5' key={i} src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} alt='star'/>
                  ))}
                </div>
                <p className='text-gray-700 text-sm sm:text-base mt-3'>{testimonial.feedback}</p>
              </div>
              <a href="#" className='italic text-green-600 underline px-5 text-sm'>Read more</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSection
