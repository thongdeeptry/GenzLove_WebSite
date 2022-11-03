import React,{useContext} from 'react'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import {AuthContext} from './context/AuthContext'
const Messenger =()=> {
  console.log("ALOOOOO MESS NHẮN TIN ")
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Messenger