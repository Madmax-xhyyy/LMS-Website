import { GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
   <footer className="flex flex-col text-center bg-[#062218] w-full text-white py-6 px-6 sm:pt-12 sm:px-16">
    <div className="flex items-start justify-between mb-10 gap-4">
      <a href="" className="flex items-center cursor-pointer">
        <p className="font-semibold sm:text-xl sm:font-bold flex gap-1"><GraduationCap color="#ffffff" /> NeuroLearn</p>
      </a>
      <div className="text-start">
        <h2 className="font-semibold">Company</h2>
        <ul className="text-gray-300">
          <li><a href="">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="hidden md:flex md:flex-col text-start gap-2">
        <h2 className="font-semibold">Subscribe to our newsletter</h2>
        <p className="text-gray-300">The latest news, articles, and resources, sent to your inbox weekly.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Enter your email" className="bg-gray-700 borde-2 border-gray-600 p-2 rounded" />
          <button className="bg-green-800 py-2 px-4 rounded cursor-pointer">Subscribe</button>
        </div>
      </div>
    </div>
    <hr className="text-white/80"/>
    <p className="text-xs text-white/80 mt-6 sm:text-sm ">Copyright 2025 © Siegrid.All Right Reserved.</p>
   </footer>
  )
}

export default Footer;
