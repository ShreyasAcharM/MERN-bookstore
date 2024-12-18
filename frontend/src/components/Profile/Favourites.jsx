import React, { useEffect, useState } from 'react'
import axios from "axios"
import BookCard from "../BookCard/BookCard"

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState()
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-favourite",{headers})
      setFavouriteBooks(response.data.data)
    }
    fetch();
  },[FavouriteBooks])
  return (
    <>
    {FavouriteBooks && FavouriteBooks.length === 0 && <div className="h-[100%] flex items-center justify-center text-5xl font-semibold text-zinc-500">So empty here</div>}
    <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {FavouriteBooks && FavouriteBooks.map((items,i) => (
        <div key={i}>
          <BookCard data={items} favourite={true}/>
        </div>
      ))}
    </div>
    </>
  )
}

export default Favourites