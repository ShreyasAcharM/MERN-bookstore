import React from 'react'
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import {useSelector} from "react-redux";

const Navbar = () => {
  const links = [
    {
      title:"Home",
      link:"/"
    },
    {
      title:"All Books",
      link:"/all-books"
    },
    {
      title:"Cart",
      link:"/cart"
    },
    {
      title:"Profile",
      link:"/profile"
    },
    {
      title:"Admin Profile",
      link:"/profile"
    }
  ];
  
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const role = useSelector((state)=>state.auth.role);
  if(isLoggedIn === false){
    links.splice(2,3);
  }
  if(isLoggedIn ===true && role === "user"){
    links.splice(4,1)
  }
  if(isLoggedIn === true && role === "admin"){
    links.splice(3,1);
  }

  const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
            <img className="h-10 me-4 bg-tr" src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo"></img>
            <h1 className="text-2xl font-semibold">Book4U</h1>
        </Link>
        <div className="nav-links-book4u block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items,i) => (<Link to={items.link} className="hover:text-blue-500 transition-all duration-300" key={i}>{items.title}</Link>))}
          </div>
          <div className="hidden md:flex gap-4">
            {isLoggedIn === false && (
              <>
                <Link to="/Login" className="px-4 py-1 hover:bg-white hover:text-blue-500 transition-all duration-300 border border-blue-500 rounded">Log In</Link>
                <Link to="/SignUp" className="px-4 py-1 hover:bg-white hover:text-blue-500 transition-all duration-300 bg-blue-500 rounded">Sign Up</Link>
              </>
            )}
          </div>
          <button onClick={()=>MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")} className="hover:text-zinc-400 md:hidden">
            <IoMenu />
          </button>
        </div>
      </nav>
      <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {links.map((items,i) => (<Link to={items.link} onClick={()=>MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")} className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300" key={i}>{items.title}</Link>))}
        {isLoggedIn === false && (
          <>
          <Link to="/Login" onClick={()=>MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")} className={`${MobileNav} mb-8 text-4xl font-semibold px-8 py-2 hover:bg-white hover:text-blue-500 transition-all duration-300 border border-blue-500 rounded`}>Log In</Link>
          <Link to="/SignUp" onClick={()=>MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")} className={`${MobileNav} mb-8 text-4xl font-semibold px-8 py-2 hover:bg-white hover:text-blue-500 transition-all duration-300 bg-blue-500 rounded`}>Sign Up</Link>
          </>
        )}     
      </div>
    </>
  )
}

export default Navbar;