import { Search } from 'lucide-react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const SearchBar = ({data}) => {

  const navigate = useNavigate();
  const [input,setInput] = useState(data ? data : '');

  const onSearchHandler = (e) => {
    e.preventDefault()
    navigate('/course-list/' + input)
  }
  return (
    <div>
      <form onSubmit={onSearchHandler} className='flex gap-2 justify-center'>
        <div className='flex flex-nowrap items-center border  border-gray-400 rounded gap-1 w-full'>
          <span className='px-2 text-gray-400'><Search /></span>
          <input onChange={e => setInput(e.target.value)} value={input} type="text" placeholder="Search for courses" id='search' className='h-full w-full px-2 focus:outline-none'/>
        </div>
        
        <button type='submit' className='border p-2 rounded bg-green-800 text-white font-bold cursor-pointer'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
