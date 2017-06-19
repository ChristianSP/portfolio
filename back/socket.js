var utilidades = require('./utilidades');

var initSocket = function(http,Name){
    var io = require('socket.io')(http);

    io.on('connection', (socket) => {
        socket.join("general");
        console.log('user connected');

        socket.on('text was added', (data) => {
            utilidades.getRandomName( (randomName) => {
                socket.to('general').emit('textAdded', {"who": "user", "text": data.text, "username": randomName});
                socket.emit('textAdded', {"who": "self", "text": data.text, "username": randomName});
            },Name);
        });
    });

    return io;
}

var sendBotText = function(io,text,name){
    io.to('general').emit('textAdded', {"who": "bot", "text": text, "username": name});
}

module.exports.initSocket = initSocket;
module.exports.sendBotText = sendBotText;
