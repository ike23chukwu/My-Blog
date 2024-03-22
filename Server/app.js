// cors bcrypt express dotenv validator morgan mysql2 jsonwebtoken uuid ws

// Web Scoket (ws) is used for real-time update from the server. Read more on Web Sockets either on npmjs or watch tutorial videos
// Web Socket is only supported on http module. 
// To achieve this, we create a server using http, connect our express app to the server, then listen to our server

const express = require('express') // import express package
const http = require('http')    // to create a server for real-time connection
const morgan = require('morgan')
require('dotenv').config()      // importing the dot env file
const bodyParser = require('body-parser')
const cors = require('cors')
const WebSocket = require('ws')
const accountsRoutes = require('./routes/accountRoutes')
const blogRoutes = require('./routes/blogsRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()       // creating an instance of express (class)
const PORT = process.env.PORT || 3000       // using the dot env file


// Middlewares
app.use(morgan('dev'))

app.use(bodyParser.json())      // used to identify the body of a request

app.use(
    cors({
        origin: ["http://127.0.0.1:5500", "https://hiit-blog.onrender.com"],
        credentials: true,
    })
)

app.use('/accounts', accountsRoutes)
app.use('/blogs', blogRoutes)
app.use('/user', userRoutes)

const server = http.createServer(app)   // to create out http server and pass our express server into it.

const wss = new WebSocket.Server({ server });    // create the web socket server


// Create a Web Socket Server connection
wss.on('connection', (ws) => {
    console.log('Connection Established')

    // handle incoming WebSocket messages
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`${message}`)
    });

    // handle WebSocket disconnection
    ws.on('close', () => {
        console.log(`WebSocket disconnected:`);
    });
});

// app.listen(PORT, () => {
//     console.log(`Listening on PORT ${PORT}`)
// })

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})