import dotenv from "dotenv";
import { connectionDB } from "./database/db.js";
import {Server} from "socket.io";
import { getDocument, updateDocument } from "./controllers/documentControllers.js";


dotenv.config({
    path: "./.env"
});


const PORT = process.env.PORT || 8000;

connectionDB();


const io = new Server(PORT,{
    cors: {
        origin: "https://google-docs-clone-olive.vercel.app",
        methods: ["GET", "POST"],
       
    }
});

io.on('connection',socket=>{
    console.log('New client connected');
    socket.on('get-document',async documentId=>{
        const document = await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document',document.data);

        socket.on('send-changes',delta=>{
            socket.broadcast.to(documentId).emit('receive-changes',delta);
        })

        socket.on('save-document',async data=>{
            await updateDocument(documentId,data);
        })

    })
});

console.log(`Server is running on port ${PORT}`); 



