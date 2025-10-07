import { assets } from '../../assets/assets';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='flex md:flex-row flex-col items-center justify-between text-left w-full pt-6 px-8 md:pb-4  border-t'>
      <div className='flex items-center gap-4 mb-5 md:mb-0'>
        <p className='font-bold flex gap-1'><GraduationCap /> NeuroLearn</p>
        <div className='flex items-center gap-3'>
        <a href="#">
          <img src={assets.facebook_icon} alt="facebook icon" />
        </a>
        <a href="">
          <img src={assets.twitter_icon} alt="twitter icon" />
        </a>
        <a href="">
          <img src={assets.instagram_icon} alt="instagram icon" />
        </a>
      </div>
        
      </div>
      <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>
        <p className='py-2 text-center text-xs md:text-sm text-gray-500'>
          Copyright 2025 NeuroLearn. All Right Reserve.
        </p>
      
    </footer>
  )
}

export default Footer
