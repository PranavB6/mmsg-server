import * as express from "express";
import * as socketio from "socket.io";
import { User } from "./types/user.model";
import { UserManager } from "./types/user-manager.model";
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 8080;

app.get("/", (req: any, res: any) => {
    res.send("<h1>Heyyyy ;)</h1>");
});

let users: UserManager = new UserManager();

io.on("connection", (socket: socketio.Socket) => {
    console.log("Someone connected :)");

    // When a user joins a room...
    socket.on("join-room", ({ username, room }) => {
        const user = new User(username, room, socket.id);

        socket.join(user.room);

        socket.emit("server-msg", "Welcome to MMsg!");

        socket.broadcast
            .to(user.room)
            .emit("server-msg", `${user.name} has entered the chat!`);

        users.add(user);

        console.log(`${user.name} has entered ${user.room}`);
    });

    // let serverMsg = new ServerMessage();
    // let msg = new Message("user");

    // Talk to the current user

    // setInterval(() => {
    //   socket.emit("chat-msg", serverMsg.withText("Hi"));
    // }, 2000);

    // When a user send a message
    socket.on("chat-msg", (msg: string) => {
        const user = users.get(socket.id);

        console.log(`[${user.name}]: ${msg}`);

        socket.broadcast.to(user.room).emit("chat-msg", user.createMsg(msg));
    });

    // Talk to Everyone
    // io.emit();

    // Talk to everyone except current user
    // socket.broadcast.emit("sys", `Someone connected`);

    // When current user disconnects...
    socket.on("disconnect", () => {
        
        console.log("Someone disconnected :(");
        io.emit("server-msg", `Someone has left the chat`);
    });
});

server.listen(PORT, () => {
    console.log(`listening on: ${PORT}`);
});
