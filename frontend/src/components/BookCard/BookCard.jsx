import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({data,favourite}) => {
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:data._id
  }
  const handleRemoveFav = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/remove-from-favourite",{},{headers})
    alert(response.data.message)
  }
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
        <Link to={`/view-book-details/${data._id}`}>
            <div className="">
                <div className="bg-zinc-900 rounded flex items-center justify-center">
                    <img src={data.url} alt="/" className="h-[25vh]"></img>
                </div>
                <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
                <p className="text-zinc-500">{data.author}</p>
                <p>Rs. {data.price}</p>
            </div>
        </Link>
        {favourite && (
          <button className="bg-yellow-50 text-xl px-4 py-2 rounded border border-yellow=500 text-yellow-500 mt-4" onClick={handleRemoveFav}>
            Remove from favourites
          </button>
        )}
    </div>
  )
}

export default BookCard