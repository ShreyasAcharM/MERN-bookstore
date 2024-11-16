import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";





const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);  // Set initial state to `null`

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.role)

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);  // Update state with fetched data
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetch();
  }, [id]);  // Add `id` as a dependency to re-fetch if `id` changes

  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id
  }
  const handleFavourite = async() => {
    const response = await axios.put("http://localhost:1000/api/v1/add-to-favourite",{},{headers})
    alert(response.data.message)
  }

  const handleCart = async() => {
    const response = await axios.put("http://localhost:1000/api/v1/add-to-cart",{},{headers})
    alert(response.data.message)
  }

  const handleDelete = async() => {
    const response = await axios.delete(`http://localhost:1000/api/v1/delete-book/${id}`,{headers})
    alert(response.data.message)
    navigate("/all-books")
  }


  // Render loading state while `Data` is `null`
  if (!Data) return <div className="w-full h-[100%] flex items-center justify-center"><Loader /></div>;

  return (
    <div className=" bg-zinc-900 px-4 md:px-12 py-8 flex flex-col lg:flex-row gap-8 items-start">
      <div className=" w-full lg:w-3/6">
        <div className="flex lg:flex-row flex-col justify-around bg-zinc-800 p-12 rounded">
          <img src={Data.url} alt="Book cover" className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded" />
          {isLoggedIn === true && role ==="user" && (
            <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
            <button className="bg-white rounded-full text-3xl p-2 flex items-center justify-center" onClick={handleFavourite}><FaHeart /><span className="lg:hidden mx-4 text-xl">Favourites</span></button>
            <button className="bg-white rounded-full text-3xl p-2 mt-0 lg:mt-10 flex items-center justify-center " onClick={handleCart}><FaCartPlus /><span className="lg:hidden mx-4 text-xl">Add to cart</span></button>
          </div>
          )}
          {isLoggedIn === true && role ==="admin" && (
            <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
            <Link to={`/update-book/${id}`} className="bg-white rounded-full text-3xl p-2 flex items-center justify-center"><FaEdit /><span className="lg:hidden mx-4 text-xl">Edit</span></Link>
            <button className="bg-white rounded-full text-3xl p-2 mt-0 lg:mt-10 flex items-center justify-center" onClick={handleDelete}><MdDeleteForever /><span className="lg:hidden mx-4 text-xl">Delete</span></button>
          </div>
          )}
        </div>
      </div>
      <div className="p-4 w-full lg:w-3/6">
        <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
        <p className="text-zinc-400 mt-1">by {Data.author}</p>
        <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
        <p className="flex mt-4 items-center justify-center text-zinc-400">{Data.language}</p>
        <p className="mt-4 text-zinc-100 text-3xl font-semibold">Price: Rs. {Data.price}</p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
