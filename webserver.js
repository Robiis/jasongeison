const express = require("express");
const app = express();
const path = require("path");
//const fs = require("fs");
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));

server.on("error", function(err) {
    console.error(err);
});

server.listen(process.env.PORT || 3000, function() {
    console.log("Server started");
});

vote1 = 0;
vote2 = 0;

io.on("connection", function(socket) {
    socket.on("answer", function(data) {
        if (data === 1) {
            vote1++;
        } else if (data === 2) {
            vote2++;
        }
        // fs.writeFile(path.join(__dirname, "data_file.txt"), "jasons:"+vote1.toString()+" geisons:"+vote2.toString(), function(err) {
        //     if (err) throw err;

        //     fs.readFile(path.join(__dirname, "data_file.txt"), "utf8" , (err, data) => {
        //         if (err) throw err;
        //         socket.emit("results", data);
        //     });
        // });
        socket.emit("results", "jasons:"+vote1+" geisons:"+vote2);
    });
});