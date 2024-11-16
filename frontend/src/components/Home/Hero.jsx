import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row items-center justify-center">
        <div className=" w-full md:mb-0 mb-12 lg:w-3/6 flex flex-col items:center lg:items-start justify-center">
            <h1 className="text-4xl lg:text-6xl font-semibold text-blue-100 text-center lg:text-left">Discover your next read</h1>
            <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">Uncover captivating stories, enriching knowledge and endless inspiration in our curated collection of books</p>
            <div className="mt-8 flex items-center justify-center"><Link to="/all-books" className="text-blue-500 text-xl lg:text-2xl font-semibold border border-blue-500 px-10 py-2 rounded-full hover:bg-white transition-all duration-300">Discover</Link></div>
        </div>
        <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
            <img className="opacity-50" src="./book-store.jpg"></img>
        </div>    
    </div>
  )
}

export default Hero