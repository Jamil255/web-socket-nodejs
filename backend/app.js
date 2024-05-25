import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT_URL || 3000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.emit('welcome', 'Welcome to web socket');

  socket.on('username', (payload) => {
    socket.broadcast.emit('message', payload);
  });

  socket.on('typing', (payload) => {
    socket.broadcast.emit('typing', `${payload} is typing...`);
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping');
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
