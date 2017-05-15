var socket = require("socket.io"),
    http = require("http"),
    server = http.createServer(),
    port = process.env.PORT || 3200,
    socket = socket.listen(server);


socket.on('connection', function(connection){
    console.log("User connected");

    connection.on("message", function(msg){
        socket.emit("message", msg);
    })
});

server.listen(port, function(){
    console.log('Server started on port ' + port);
}); 
