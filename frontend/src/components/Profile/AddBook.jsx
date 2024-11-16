import axios from 'axios'
import React, { useState } from 'react'

const AddBook = () => {
const [Data, setData] = useState({
    url:"",
    title:"",
    author:"",
    price:"",
    desc:"",
    language:""
})

const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }

const submit = async() => {
    try {
        if(Data.url === "" || Data.title === "" || Data.author === "" || Data.price === "" || Data.desc === "" || Data.language === ""){
            alert("All fields are required")
        }else{
            const response = await axios.post("http://localhost:1000/api/v1/add-book",Data,{headers})
            setData({
                url:"",
                title:"",
                author:"",
                price:"",
                desc:"",
                language:""
            })
            alert(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
}

const change = (e) => {
    const {name,value} = e.target;
    setData({...Data,[name]:value})
}

  return (
    <div>
        <div className="text-3xl font-semibold text-zinc-300">Book information</div>
        <div className="rounded-xl bg-zinc-800 p-8 mt-4">
            <div className="">
                <label className="text-zinc-300">Image</label>
                <input type="text" className="bg-zinc-900 w-full p-2 m-2" name="url" placeholder="image url" required value={Data.url} onChange={change}></input>
            </div>
            <div className="">
                <label className="text-zinc-300">Title</label>
                <input type="text" className="bg-zinc-900 w-full p-2 m-2" name="title" placeholder="title" required value={Data.title} onChange={change}></input>
            </div>
            <div className="">
                <label className="text-zinc-300">Author</label>
                <input type="text" className="bg-zinc-900 w-full p-2 m-2" name="author" placeholder="author" required value={Data.author} onChange={change}></input>
            </div>
            <div className="">
                <label className="text-zinc-300">Price</label>
                <input type="text" className="bg-zinc-900 w-full p-2 m-2" name="price" placeholder="price" required value={Data.price} onChange={change}></input>
            </div>
            <div className="">
                <label className="text-zinc-300">Language</label>
                <input type="text" className="bg-zinc-900 w-full p-2 m-2" name="language" placeholder="language" required value={Data.language} onChange={change}></input>
            </div>
            <div className="">
                <label className="text-zinc-300">Description</label>
                <textarea type="text" required value={Data.desc} onChange={change} className="bg-zinc-900 w-full p-2 m-2" name="desc" placeholder="description"></textarea>
            </div>
            <div className="mt-4 flex items-center justify-center">
                <button className="bg-blue-500 rounded hover:bg-blue-200 transition-all duration-300 p-2" onClick={submit}>Add Book</button>
            </div>
        </div>
    </div>
  )
}

export default AddBook