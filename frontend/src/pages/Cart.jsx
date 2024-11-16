import React, { useEffect, useState } from 'react'
import Loader from "../components/Loader/Loader"
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const Navigate = useNavigate();
  const [Cart, setCart] = useState()
  const [Total, setTotal] = useState(0)
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }

  const handleDelete = async (bookid) => {
    const response = await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookid}`,{},{ headers })
    alert(response.data.message)
  }

  const handleOrder = async () => {
    try {
      const response = await axios.post("http://localhost:1000/api/v1/place-order",{order:Cart},{headers})
      alert(response.data.message)
      Navigate("/profile/orderHistory")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-cart",{headers})
      setCart(response.data.data)
    }
    fetch();
  },[Cart])

  useEffect(() => {
      if(Cart && Cart.length > 0){
        let total = 0;
        Cart.map((items) => {
          total += items.price;
        })
        setTotal(total);
        total=0;
      }
  },[Cart])

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {!Cart && <div className="w-full h-[100%] flex items-center justify-center"><Loader /></div>}
        {Cart && Cart.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex items-center justify-center flex-col">
              <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">So empty here...</h1>
            </div>
          </div>
        )}
        {Cart && Cart.length > 0 && (
          <>
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your cart</h1>
            {Cart.map((items,i) =>(
              <div className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center" key={i}>
                <img src={items.url} alt="/" className="h-[20vh] md:h-[10vh] object-cover"/>
                <div className="w-full md:w-auto">
                  <h1 className="text-2xl text-zinc-300 font-semibold text-start mt-2 md-mt-0">
                    {items.title}
                  </h1>
                  <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                    {items.desc.slice(0,100)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                    {items.desc.slice(0,65)}...
                  </p>
                  <p className="text-2xl text-zinc-300 mt-2 block md:hidden">
                    {items.desc.slice(0,100)}...
                  </p>
                </div>
                <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                  <h2 className="text-zinc-100 text-3xl font-semibold flex">Rs. {items.price}</h2>
                  <button className="bg-white rounded-full text-2xl p-2 ms-12" onClick={() => handleDelete(items._id)}><MdDelete /></button>
                </div>
              </div>
            ))}
          </>
        )}
        {Cart && Cart.length > 0 && (
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-zinc-200 text-3xl font-semibold">Total amount</h1>
              <div className="text-zinc-200 text-xl mt-3 flex items-center justify-between">
                <h2>{Cart.length} Books</h2>
                <h2>Rs. {Total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <button className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-500 transition-all duration-300" onClick={handleOrder}>Place your order</button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Cart