import React from 'react'
import SearchBar from './SearchBar'


const Hero = () => {
  return (
    <div className='flex flex-col text-center h-auto mx-auto mt-[-10] max-w-xl gap-4'>
      <h1 className='text-2xl font-extrabold sm:text-3xl md:text-6xl'>Learn Anytime, Anywhere with <span className='text-green-400'>NeuroLearn.</span></h1>
      <h2 className='italic text-gray-600 md:text-lg'>"Your gateway to expert-led courses, skill-building, and career transformation—online and on your schedule."</h2>
      <SearchBar />
    </div>
  )
}

export default Hero
