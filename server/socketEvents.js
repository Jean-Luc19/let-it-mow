exports = module.exports = (io) => {
  io.on('connection', socket => {
    console.log('a user has connected');
    socket.on('enter conversation', conversation => {
      socket.join(conversation);
    });

    socket.on('leave conversation', conversation => {
      socket.leave(conversation);
    });

    socket.on('new message', conversation => {
      console.log("new message sent through socket")
      socket.broadcast.to(conversation).emit('refresh messages', conversation);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
