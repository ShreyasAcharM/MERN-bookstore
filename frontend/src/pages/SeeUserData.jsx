import React from 'react'
import {RxCross1} from "react-icons/rx"

const SeeUserData = ({userDivData, userDiv, setuserDiv}) => {
  return (
    <>
        <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}></div>{" "}
        <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
            <div className="bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%]">
                <div>
                    <h1 className="text-2xl text-black font-semibold">User Information</h1>
                </div>
                <div className="mt-2">
                    <label className="text-black">
                        Username :{" "}
                        <span className="font-semibold text-black">{userDivData.username}</span>
                    </label>
                </div>
                <div className="mt-2">
                    <label className="text-black">
                        Email :{" "}
                        <span className="font-semibold text-black">{userDivData.email}</span>
                    </label>
                </div>
                <div className="mt-2">
                    <label className="text-black">
                        Address :{" "}
                        <span className="font-semibold text-black">{userDivData.address}</span>
                    </label>
                </div>
                <div className="flex justify-center">
                        <button className="rounded-full bg-zinc-200 p-2" onClick={() => setuserDiv("hidden")}>
                            <RxCross1 className="text-black"/>
                        </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default SeeUserData