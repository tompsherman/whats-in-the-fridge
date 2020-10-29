require('dotenv').config()

const express = require('express')
const path = require('path')
require('colors')

const PORT = process.send.PORT || 8888

const server = express()

server.use(express.json())

server.use(express.static(path.join(__dirname, 'client/build')))

const currentTime = new Date().toDateString()

server.get('/', (req,res)=>{ 
    res.status(202).json({message: "what's in the fridge?"})
 })

// @desc		Test end is working
// @route		GET /test
server.get('/test', (req, res) => {
    res.status(202).json({message: 'the server is running at ' + currentTime})
})

//@desc         Catchall path
//@route        GET *
// server.get('*', (req,res)=>{ 
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
//  })

 server.listen(PORT, ()=>{
     console.log(`*** smoking on port ${PORT} ***`.random)
 })