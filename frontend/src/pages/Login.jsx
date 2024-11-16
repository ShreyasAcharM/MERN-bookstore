import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {authActions} from "../Store/auth"
import {useDispatch} from "react-redux"

const Login = () => {
  const [Values, setValues] = useState({
    username:"",
    password:""
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const change = (e) => {
    const {name,value} = e.target;
    setValues({...Values,[name]:value})
  }
const submit = async () => {
  try {
    if(Values.username==="" || Values.password===""){
      alert("All fields are required");
    }else{
      const response = await axios.post("http://localhost:1000/api/v1/sign-in",Values)
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem("id",response.data.id);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("role",response.data.role);
      navigate("/profile")
    }
  } catch (error) {
    alert(error.response.data.message)
  }
}

  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Username
            </label>
            <input 
              type="text"
              className="w-full mt-4 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              value={Values.username}
              onChange={change}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input 
              type="password"
              className="w-full mt-4 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              value={Values.password}
              onChange={change}
              required
            />
          </div>
          <div className="mt-6">
            <button className="w-full bg-blue-500 text-white font-semibold py-2 hover:bg-white hover:text-blue-500 transition-all duration-300 rounded-lg" onClick={submit}>
              Login
            </button>
            <p className="text-white font-semibold flex items-center justify-center m-4">Or</p>
            <p className="text-zinc-400 flex items-center justify-center">Dont have an account? <Link to="/SignUp" className="underline ml-4 hover:text-blue-200 transition-all duration-300">SignUp</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login