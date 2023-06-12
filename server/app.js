const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors")

app.use(cors())

const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173"
  }
});

  app.get('/', (req, res) => {
    res.status(200).json({val:"ok"})
  });

  
  io.on('connection', (socket) => {
    console.log('a user connected ');

    socket.on('join',(userId)=>{
      socket.join(userId)
      console.log("user joined successfully ", userId)
    })
    
    socket.on("message_send",(data)=>{
      socket.to(data.to).emit("message_received",data)
    })


 
  });
  
  server.listen(9000, () => {
    console.log('listening on : 9000');
  });