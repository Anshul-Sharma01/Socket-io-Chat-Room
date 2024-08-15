const app = require('express')();
// const express = require("express");
// const app = require("express");

const server = require("http").createServer(app);
// const http = require("http");
// const server = http.createServer(app);

const io = require("socket.io")(server);


io.on("connection", (socket) => {
    console.log("Socket Details: ",socket);
    console.log("Socket is active to be connected");

    socket.on("chatroom", (payload) => {
        console.log("Payload : ", payload);
        // Re-emitting the payload
        io.emit("chatroom", payload); 
    })
})


server.listen(5000, () => {
    console.log("Server is listening at port 5000");
})







