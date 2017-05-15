var socket = require("socket.io"),
    http = require("http"),
    server = http.createServer(),
    port = process.env.PORT || 3200,
    socket = socket.listen(server);


socket.on('connection', function(connection){
    console.log("User connected#" + connection.id);

    connection.on("message", function(msg){
        console.log(msg);
        socket.emit("message", msg);
    })
});

server.listen(port, function(){
    console.log('Server started on port ' + port);
    console.log('Version: v1.1');
}); 
