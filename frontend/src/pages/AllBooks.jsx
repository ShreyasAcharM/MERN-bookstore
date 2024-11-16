import React, {useEffect, useState} from 'react'
import axios from 'axios';
import BookCard from '../components/BookCard/BookCard'
import Loader from "../components/Loader/Loader"

const AllBooks = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-all-books");
      setData(response.data.data);
    }
    fetch();
  }, [])
  return (
    <>
      {!Data && <div className="bg-zinc-900 h-screen w-full flex items-center justify-center"><Loader /></div>}
      {Data && (
        <div className="bg-zinc-900 px-12 py-8 text-white h-auto ">
        <h4 className="text-3xl">All Books</h4>
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Data && Data.map((items,i)=><div key={i}><BookCard data={items}/></div>)}
        </div>
      </div>
      )}
    </>
  )
}

export default AllBooks