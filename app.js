var socket = require("socket.io"),
    http = require("http"),
    server = http.createServer(),
    port = process.env.PORT || 3900,
    socket = socket.listen(server);

var connections = [];
var rooms = [];

socket.on('connection', function (conn) {
    connections.push(conn.id);
   // console.log(conn);

    log('Connection started ' + conn.id + ', # of connections ' + connections.length);

    log('Updating rooms to newly connected user');
    socket.emit('UPDATE_ONLY_ROOMS', rooms);
    //io.sockets.connected[socket.id].emit('UPDATE_ONLY_ROOMS', rooms);

    conn.on('disconnect', function (data) {
        //log(connections);
        for (var i = 0; i < connections.length; i++) {
            if (connections[i] == conn.id) {
                connections.splice(i, 1);
            }
        }

        log('Connection lost ' + conn.id + ', # of connections ' + connections.length);

    });

    //broadcast message
    conn.on('SEND_MESSAGE', function (data) {
        socket.emit('SEND_MESSAGE', { msg: data });
    });

    //let create room 
    conn.on('UPDATE_RUN', function (data) {
        socket.emit('UPDATE_RUN', data);
    });

     //when runner create a room 
    conn.on('START_RUN', function (data) {
        socket.emit('START_RUN', data);
        //io.sockets.to(player.room).emit('UPDATE_GAME', { players: players, thisPlayer: player, choiceCard: null });
    });
    
   //let when someone join room 
    conn.on('JOIN_ROOM', function (data) {
        socket.emit('JOIN_ROOM', data);
        //io.sockets.to(player.room).emit('UPDATE_GAME', { players: players, thisPlayer: player, choiceCard: null });
    });


    //let when someone join room 
    conn.on('UPDATE_ROOMS', function () {
        //io.sockets.connected[socket.id].emit('UPDATE_ROOMS', rooms);
        socket.emit('UPDATE_ROOMS', rooms);
        //io.sockets.to(player.room).emit('UPDATE_GAME', { players: players, thisPlayer: player, choiceCard: null });
    });

    //let when runner create room
    conn.on('CREATE_ROOM', function (room) {
        console.log(room);
        room.createDate = new Date();
        rooms.push(room);

        console.log(rooms.length);
        
        socket.emit('UPDATE_ROOMS', rooms);
        
        //io.sockets.to(player.room).emit('UPDATE_GAME', { players: players, thisPlayer: player, choiceCard: null });
    });

    conn.on("message", function(msg){
        console.log(msg);
        socket.emit("message", msg);
    })
});

server.listen(port, function(){
    console.log('Server started on port ' + port);
    console.log('Version: v1.2');
}); 

var log = function (obj) {
    console.log(JSON.stringify(obj));
};