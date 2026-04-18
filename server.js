import{WebSocket,WebSocketServer} from "ws";

const wss = new WebSocketServer({ port: 8080 });

//connection event
wss.on("connection", (socket,request) => {
const ip = request.socket.remoteAddress;

 socket.on("message",(rawData)=>{
    const data = JSON.parse(rawData);
    console.log({rawData});

    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) client.send(`Server Brodcast: $({rawData})`);
    })
 })
  
 socket.on('error', (err) => {
     console.error(`Error: ${err.message}`);
 })

 socket.on('close', () => {
    console.log('Client disconnected');
 })


});
 
console.log("Server is running on port 8080");