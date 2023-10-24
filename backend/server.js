require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const http = require('http')
const { Server } = require('socket.io')
const PORT = process.env.PORT || 3500 

connectDB()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

console.log(process.env.NODE_ENV)
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))
app.use('/', require('./routes/userRoutes'))

app.use('/items', require('./routes/itemRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')){
        res.json({ message: '404 Not Found' })
    } else{
        res.type('txt').send('404 Not Found')
    }
})


mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    server.listen(8000, () => console.log(`Socket listening on port 8000`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})