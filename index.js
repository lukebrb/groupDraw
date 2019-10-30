var express = require("express");
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname, "/crowd-logo-client/build")));
var server = require("http").createServer(app);
server.listen(process.env.PORT || 5000);

var io = require("socket.io")(server);

io.on("connection", function(socket) {
  socket.on("drawing", function(drawing) {
    io.emit("view drawing", drawing);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/crowd-logo-client/build/index.html"));
});

console.log(__dirname);
console.log("Server running on port 5000");
