import { useState, useRef } from 'react'
import './App.css'
import React from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { Route, Routes, useNavigate } from 'react-router-dom'
import EmailHistory from './pages/EmailHistory'
import Preview from './pages/Preview'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {

  const [msg,setMsg] = useState("")
  const [status, setStatus] = useState(false)
  const [emailList, setEmailList] = useState([])
  const [subject,setSubject] = useState("")

  const navigate = useNavigate();

  const fileInputRef = useRef(null)

  const handleSubject = function(ev){
    const subVal = ev.target.value
    setSubject(subVal)
  }
  const handleMsg = function(event){
    const msgValue = event.target.value
    setMsg(msgValue)
  }

  const send = function(){

      if (!msg.trim()) {
    alert("Message cannot be empty");
    return;
  }

  if (emailList.length === 0) {
    alert("Please upload an email list");
    return;
  }

    setStatus(true)
    axios.post("https://bulkemail-backend.vercel.app/sendemail",{msg:msg, emailList:emailList, subject:subject}).then(function(data){
      if(data.data === true){
        alert("Email has been sent successfully..")
        setStatus(false)
        setMsg("")
        setEmailList([])
        setSubject("")
        if (fileInputRef.current) {
    fileInputRef.current.value = ""
  }
      }
      else{
        alert("Email failed to send")
        
        
      }
      setStatus(false)
    })
    .catch(() => {
      alert("Server error");
      setStatus(false); 
    });
  }

  const handleEmail = function(event){
     // console.log(event)
    const file = event.target.files[0]
    // console.log(file)
    const reader = new FileReader()

    reader.onload = function(evt){
        const data = evt.target.result;
        // console.log(data)

        const workbook = XLSX.read(data,{type: "array"})

        // console.log(workbook)

        const sheetName = workbook.SheetNames[0]

        const workSheet = workbook.Sheets[sheetName]

        // console.log(workSheet)

        const emaillist = XLSX.utils.sheet_to_json(workSheet,{header:"A"})
        const totalEmailList = emaillist.map(function(item){
          return item.A
        })
        setEmailList(totalEmailList)
        console.log(totalEmailList)

    }

    
    reader.readAsArrayBuffer(file)

  }

  return (
  
    <Routes>
      <Route path='*' element={<Login/>} ></Route>   
          <Route path='/login' element={<Login/>} ></Route>  
      <Route path='/home' element={<Home
      subject={subject}
      handleSubject={handleSubject}
      emailList={emailList}
      msg={msg}
      handleMsg={handleMsg}
      status={status}
      handleEmail={handleEmail}
      send={send}
      fileInputRef={fileInputRef}
      />} 
      
      >
          </Route>
          
      <Route path="/history" element={<EmailHistory />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
    
    
  )
}

export default App
