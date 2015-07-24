import 'better-log/install';
import config from './config';
import express from 'express';
import frontend from './frontend';
import socketio from 'socket.io';


import {Server} from 'http';

const app = express();
const server = Server(app);


// Load react-js frontend.
app.use(frontend);

// Socket.io
const io = socketio(server);

io.sockets.on('connection', socket => {
    console.log('connection');

    setTimeout(() => {
        socket.emit('todo:add', {title: 'SOCKET TODO FTW'});
    }, 5000);

    setTimeout(() => {
        socket.emit('todo:edit', {id:1000, title: new Date()});
    }, 2000);
});

// Add error handler. Four arguments need to be defined in order for the
// middleware to act as an error handler.
app.use((err, req, res, next) => {
    const msg = err.stack || err;
    console.log('Yay', msg);
    res.status(500).send('500: ' + msg);
});

server.listen(config.port, () => {
    console.log('Server started at port %s', config.port);
});
