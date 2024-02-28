const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const {getPastMsgs, createNewMsg, getAllIncomingMsgs, filterIncomingMsgs} = require("./socket_helpers/fetcher");
const axios = require("axios");
const path = require("path");
const app = express();
const httpServer = createServer(app);
const {storage} = require("./app/firebase_config");
const {ref, uploadBytesResumable, getDownloadURL} = require("firebase/storage");
const io = new Server(httpServer, { 
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    
    }
});

io.use(async(socket, next) => {

    const token = socket.handshake.auth.token;
    const username = socket.handshake.auth.username;
    const connectTo = socket.handshake.auth.connectTo;

    if (!token || !username || !connectTo ) {
        return next(new Error("invalid or missing token"));
    }  

    try {
        user1 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/find/username/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        user2 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/find/username/${connectTo}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!user1 || !user2) {
            return next(new Error("One or both users do not exist."));
        }  
    
        if(user1.data[0].userType === "User" && user2.data[0].userType === "User") {
            // console.log(true)
            return next(new Error("Messages cannot be sent between users."));
        }
        // else{console.log("user1: ", user1.data[]); console.log(user2.data.userType)}

    } catch (error) {
        return next(new Error("Failed to authenticate user."));
    }
    next();
});

io.on("connection", async(socket) => {
    const connectorUser = socket.handshake.auth.username;
    console.log("Connected: ", connectorUser);

    socket.on("requestPastMsgs", async () => {
        const pastData = await getPastMsgs(socket);
        socket.emit("fetchPastMsgs", pastData);
    });

    socket.on("requestMsgSearch", async (searchTerm) => {
        const msgs = await filterIncomingMsgs(socket, searchTerm);
        socket.emit("fetchMsgSearch", msgs);
        
    })

    socket.on("requestInbox", async () => {
        const inboxData = await getAllIncomingMsgs(socket);
        socket.emit("fetchInbox", inboxData);
    });
    
    socket.join(`dm-${connectorUser}`);
    socket.on("privateMsg", async( to, message, attatchment) => {
        console.log("Attatchment: ", attatchment)
        var srcUrl=null;

        if(attatchment && attatchment.filename !== ""){
        const filePath = Date.now()+attatchment.filename;
        
        const storageRef = ref(storage,  `attatchments/${filePath}`);
        console.log(`Storage Ref: ${storageRef}`);
        try {
            const snapshot = await uploadBytesResumable(storageRef, attatchment.file);
            console.log('Uploaded a blob or file!');
            const downloadURL = await getDownloadURL(snapshot.ref);
            srcUrl = downloadURL;
            console.log(`File available at ${downloadURL}`);
        } catch (error) {
        console.error('Error uploading file:', error);
        }

    }
    else{
        srcUrl =null;
    };
        const data = {
            sender: connectorUser,
            recipient: to,
            message: message ? message: "",
            emittedDate: new Date().toISOString(),
            attatchment: srcUrl
        };
        srcUrl = null;
        io.to(`dm-${to}`).emit(`dmResponse-${to}`, (data));
        io.to(`dm-${to}`).emit(`notiResponse-${to}`, `${connectorUser} sent you a message.`);
        createNewMsg(data);
        console.log("Msg Sent");

    });
    socket.on("disconnect", () => {
        console.log(`${connectorUser} disconnected`);
    });

});

httpServer.listen(5000);
