import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import SeeUserData from '../../pages/SeeUserData';

const AllOrders = () => {
  const [Options, setOptions] = useState()
  const [AllOrders, setAllOrders] = useState()
  const [Values, setValues] = useState({status : ""})
  const [userDiv, setuserDiv] = useState("hidden")
  const [userDivData, setuserDivData] = useState()
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-all-orders",{headers})
      setAllOrders(response.data.data)
    }
    fetch();
  },[AllOrders])

  const change = (e) => {
    const {value} = e.target;
    setValues({status:value});
  }
  const submitChanges = async(i) => {
    const id = AllOrders[i]._id;
    const response = await axios.put(`http://localhost:1000/api/v1/update-status/${id}`,Values,{headers})
    alert(response.data.message)
  }


  return (
    <>
      {!AllOrders && <div className="h-[100%] flex items-center justify-center"><Loader /></div>}
      {AllOrders && AllOrders.length === 0 && (
         <div className="h-[80vh] p-4 text-zinc-100">
         <div className="h-[100%] flex flex-col items-center justify-center">
           <h1 className="text-5xl font-semibold text-zinc-300 mb-8">So empty here ...</h1>
         </div>
       </div>
      )}
      {AllOrders && AllOrders.length > 0 && (
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">All Orders</h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className=""><FaUser /></h1>
            </div>
          </div>
          {AllOrders.map((items,i) => (
            <div key={i} className="bg-zinc-800 w-full rounded py-2 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
              <div className="w-[3%]">
                <h1 className="text-center">{i+1}</h1>
              </div>
              <div className="w-[22%]">
                <Link to={`/view-book-details/${items.book._id}`} className="hover:text-blue-300">{items.book.title}</Link>
              </div>
              <div className="w-[45%]">
                <h1 className="">{items.book.desc.slice(0,50)}...</h1>
              </div>
              <div className="w-[9%]">
                <h1 className="">Rs. {items.book.price}</h1>
              </div>
              <div className="w-[16%]">
              <button
                onClick={()=>setOptions(i)}
                className="font-semibold hover:scale-110 transition-all duration-300"
              >
                {items.status}
              </button>
              <div className={`${Options === i ? "flex" : "hidden"} flex mt-4`}>
                <select name="status" id="" className="bg-gray-800" onChange={change} value={Values.status}>
                  {
                    [
                      "order placed",
                      "out for delivery",
                      "delivered",
                      "cenceled"
                    ].map((items,i) => (
                      <option key={i}>{items}</option>
                    ))
                  }
                </select>
                <button className="text-green-500 hover:scale-110 mx-2" onClick={()=>{
                  setOptions(-1);
                  submitChanges(i);
                }}>
                <FaCheck />
                </button>
              </div>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <button className="" onClick={()=>{
                  setuserDiv("fixed");
                  setuserDivData(items.user)
                }}><FiExternalLink /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  )
}

export default AllOrders