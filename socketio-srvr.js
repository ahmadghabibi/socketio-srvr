const { Server } = require("socket.io");
const { useAzureSocketIO } = require("@azure/web-pubsub-socket.io");
var serialport = require("serialport");


var SerialPort = serialport.SerialPort;
const port = new SerialPort({ path: '\\\\.\\COM3', baudRate: 9600 })
let gsocket;

port.on('error', function(err) {
  console.log('Error opeing serial port: ', err.message)
  // exit 0
})
port.on('open', function() 
{
  console.log('serial port open')   
});


function readFromSP(){
  port.on('data', function (data) {
    console.log('reading  '+ data )
    gsocket.emit("server", data.toString())
  })
}
function writeToSP(cmd) 
{
  console.log('writing to serial port ' + cmd)
  port.write(cmd);
}


let io = new Server(4000);
useAzureSocketIO(io, {
    hub: "Hub", // The hub name can be any valid string.
    connectionString: 'Endpoint=https://socket-relay-service.webpubsub.azure.com;AccessKey=BMXQExO2RXiJdUisFIeVT2lQhPfiUVdQI9uX18EJQ6dtTkBWtqxyJQQJ99ALACYeBjFXJ3w3AAAAAWPS1XBB;Version=1.0;'
});




console.log('Listing on socket port 4000')

//io.on("connection", async (socket) => { await socket.join("room abc"); });


io.on("connection", (socket) => {
  gsocket = socket
  console.log(`new socket connection id: ${socket.id}`)
  socket.on("cmd", (cmd) => {
         writeToSP(cmd)
         readFromSP()
        })

  



   socket.on('disconnect',()=> {
    console.log('user disconnected')
   })
});


 /*


 


const clnt = require ("socket.io-client")
module.exports =  async function (context, req) {
    
    const currCmd = req.body 
    const socket = clnt("https://ebeddedpubsub.webpubsub.azure.com", {
    path: "/clients/socketio/hubs/Hub",
    });
    socket.emit("cmd", currCmd)
    var embeddedRes = ''
    socket.on("cmdStatus", (arg) => {
        embeddedRes = arg
    });
    const responseMessage = embeddedRes + ". This HTTP triggered function executed successfully."
    context.res = {
          status:  200,
          body: responseMessage
          } 
}





 
function readFrmPort () 
{
   
    const res = port.read()
    io.emit("cmdStatus", res);  
    console.log(res); 
    port.on('cmd', function(res)
    {
        io.emit("cmdStatus", res);  
        console.log(res); 
    });
    
}



    port.write('r', function(err) {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('sent ')
    })
   */
/*
const io = require ('socket.io')
const { SerialPort } = require('serialport')
const http = require ('http')
const cors = require('cors')
const express = require ('express')
const app = express();
app.use(express.json())
app.use(express.static('public'))
app.use(cors())
const data = ['r','b','g']
app.get('/' , (req,res) => {
   res.send(data).statusCode(200)
})

const server = http.createServer(app)

const io = require ('socket.io')(server,{cors:{origin:'*'}})

io.on('connection', (socket) => {
  console.log('id:' + socket.id)
})
server.listen(3000,() => {
  console.log('server running on port 3000')
});

*/

/*
---------------------------


const io = require ('socket.io')
const clnt = require ("socket.io-client")
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
     
     const socket = clnt('http://localhost:3000')



     //const ws = new WebSocket('ws://localhost:3000')
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
 //       body: responseMessage
   // };
//}
/*
----------------------------
const port = new SerialPort({ path: '\\\\.\\COM4', baudRate: 9600 })


port.write('Hello world', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
})

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message)
})

*/

/*

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var sp = new SerialPort("COM4", {
  baudrate: 9600,
  parser: serialport.parsers.read("\n")
});

function write() //for writing
{
    sp.on('data', function (data) 
    {
        sp.write("Write your data here");
    });
}

function read () // for reading
{
    sp.on('data', function(data)
    {
        console.log(data); 
    });
}



*/