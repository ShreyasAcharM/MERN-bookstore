import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'

const Settings = () => {
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }
  const [ProfileData, setProfileData] = useState()
  const [Value, setValue] = useState({address: ""})
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-information",{headers})
      setProfileData(response.data)
      setValue({address: response.data.address})
    }
    fetch();
  },[])
  const change = (e) => {
    const {name,value} = e.target;
    setValue({...Value,[name]:value})
  }
  const submitAddress = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/update-address",Value,{headers})
    alert(response.data.message)
  }
  return (
    <>
      {!ProfileData && <div className="flex items-center justify-center"><Loader /></div>}
      {ProfileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Settings</h1>
          <div className="flex gap-12">
            <div>
              <label>Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {ProfileData.username}
              </p>
            </div>
            <div>
              <label>email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {ProfileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label>Address</label>
            <textarea className="p-2 rounded bg-zinc-800 mt-2 font-semibold" rows="5" placeholder="Address" name="address" value={Value.address} onChange={change}/>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-blue-500 text-zinc-900 rounded px-3 py-2 hover:bg-blue-200 transition-all duration-300" onClick={submitAddress}>Update</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Settings