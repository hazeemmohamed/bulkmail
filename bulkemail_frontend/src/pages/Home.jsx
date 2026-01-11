import {useRef } from 'react'
import React from 'react'

import {useNavigate } from 'react-router-dom'


function Home({subject, handleSubject,emailList, msg, handleMsg, status, handleEmail, send, fileInputRef}) {

    const navigate = useNavigate();



  return (
  
    <div className=' text-center'>
        <div className=''>
            <h1 className='bg-blue-950 text-white p-4 text-xl md:text-3xl font-bold'>BulkMail</h1>
        <button
  onClick={() => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }}
  className="bg-red-600 text-white text-sm md:text-lg rounded absolute p-1 md:p-2 top-2 right-2"
>
  Logout
</button>
        </div>

        <h1 className='bg-blue-800 text-white p-4  md:text-xl'>We can help your business with sending multiple emails at once</h1>
        <h1 className='bg-blue-600 text-white p-4 text-sm md:text-lg'>Enter the message content, upload your XLSX file, and send.</h1>
        <div className='bg-blue-400 p-2'>
          <input type="text" className='focus:outline-none focus:ring-0 
          bg-white w-[80%] md:w-[60%] 
          border border-gray-400
          rounded-tl-xl rounded-tr-xl 
          md:text-lg text-sm p-2 wrap-normal' placeholder='TO:' readOnly value={`To: ${emailList.join(", ")}`} />
          <input type="text" placeholder='Subject' value={subject} onChange={handleSubject} 
          className='focus:outline-none focus:ring-0 
          bg-white w-[80%] md:w-[60%] 
          border border-gray-400  
          md:text-lg text-sm p-2' />
          <textarea onChange={handleMsg} value={msg} placeholder='Enter you email here....' 
          className='focus:outline-none focus:ring-0 
          bg-white w-[80%] h-[60vh] md:w-[60%] md:h-[40vh] 
          border border-gray-400 
          rounded-bl-xl rounded-br-xl 
          md:text-lg text-sm p-2'></textarea>

        
          <div className='border-4 border-gray-500 border-dashed mx-auto w-fit p-4 mt-4'>
{/* <label className="inline-block cursor-pointer">
  <span className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    Upload File
  </span> */}
  <input type="file" disabled={status} ref={fileInputRef}  onChange={handleEmail} 
  className='block
      w-full
      text-sm text-gray-700
      cursor-pointer
      file:cursor-pointer
      file:mr-4
      file:py-2
      file:px-4
      file:rounded
      file:border-0
      file:text-sm
      file:font-semibold
      file:bg-blue-600
      file:text-white
      hover:file:bg-blue-700'/>
{/* </label> */}
          </div>

        <p className='mt-5 text-white'>Total Email Selected: {emailList.length}</p>

        <div className=''>
          <button onClick={send} className='bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 mr-4 cursor-pointer hover:bg-blue-700' disabled={status}>{status? "Sending...":"Send"}</button>
        <button onClick={() => navigate("/history")} className='bg-gray-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-400'>Email History</button>
        
        </div>
        {status && (
  <p className="text-white mt-3 text-lg animate-pulse">
    Sending emails...
  </p>
)}
    </div>
      <div className='bg-blue-300 p-4'>

      </div>
      <div className='bg-blue-200 p-4'>

      </div>
    </div>    
    
  )
}

export default Home
