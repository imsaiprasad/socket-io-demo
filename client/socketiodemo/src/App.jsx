import io from 'socket.io-client'
import './App.css'
const socket = io.connect("http://localhost:9000")

import { useEffect ,useRef} from 'react'



function App() {

  const to =useRef()
  const message =useRef()
  const from =useRef()
  const myId =useRef()


  useEffect(()=>{
    
    socket.on("message_received",(data)=>{
        console.log("data : ", data)
    })

  },[socket])


  function Sender()
  {

    const data={
      from:from.current.value,
      to:to.current.value,
      message:message.current.value
    }
    socket.emit("message_send",data)
   
  }

  function Joiner()
  {
    const userId=myId.current.value
     socket.emit("join",userId)
  }
 
  return (
    
    <>

<div style={{display:"block",margin:"50px"}}>
<input type='text' ref={myId} placeholder='from'/>
<button onClick={Joiner}>Join</button>
</div>


<div style={{display:"block"}}>

   <input type='text' ref={from} placeholder='from'/>
</div>
  
<div style={{display:"block"}}>

   <input type='text' ref={to} placeholder='to whom'/>
</div>
  
<div style={{display:"block"}}>

   <input type='text' ref={message} placeholder="message ..."/>
   
   </div>

    <button onClick={Sender}>send</button>
    </>
  )
}

export default App
