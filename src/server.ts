import * as express from "express";
import * as socketio from "socket.io";
import { User } from "./types/user.model";
import { UserManager } from "./types/user-manager.model";
import { Message } from "./types/message.model";
import { ServerMsg } from "./types/server-msg.model";
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 8080;

app.get("/", (req: any, res: any) => {
    res.send("<h1>Heyyyy ;)</h1>");
});

let users: UserManager = new UserManager();
let serverMsg: ServerMsg = new ServerMsg();

io.on("connection", (socket: socketio.Socket) => {
    console.log("Someone connected :)");

    // When a user joins a room...
    socket.on("join-room", ({ username, room }) => {
        const user = new User(username, room, socket.id);

        socket.join(user.room);

        socket.emit("server-msg", serverMsg.create("Welcome to MMsg!"));

        socket.broadcast
            .to(user.room)
            .emit(
                "server-msg",
                serverMsg.create(`${user.name} has entered the chat!`)
            );

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
        socket.emit("confirm-msg", user.createMsg(msg));
    });

    // Talk to Everyone
    // io.emit();

    // Talk to everyone except current user
    // socket.broadcast.emit("sys", `Someone connected`);

    // When current user disconnects...
    socket.on("disconnect", () => {
        const user = users.get(socket.id);

        console.log(`[${user.name}] disconnected :(`);
        socket.broadcast.to(user.room).emit("server-msg", serverMsg.create(`${user.name} has left the chat`));

        users.remove(user.id);
    });
});

server.listen(PORT, () => {
    console.log(`listening on: ${PORT}`);
});

