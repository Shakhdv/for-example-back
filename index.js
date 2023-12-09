require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const http = require("http").Server(app);
// const { Server } = require("socket.io");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.resolve(__dirname, "images")));
app.use(require("./routes/users.route"));
app.use(require("./routes/categories.route"));
app.use(require("./routes/lessons.route"));
app.use(require("./routes/programs.route"));
app.use(require("./routes/reviews.route"));
app.use(require("./routes/tasks.route"));
app.use(require("./routes/consults.route"));
app.use(require("./routes/chat.route"));
app.get("api", (req, res) => {
  res.json({
    message: "Hello",
  });
});

mongoose.connect(process.env.MONGO_SERVER);
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

socketIO.on("connection", (socket) => {
  console.log(`user Connected: ${socket.id}`);

  socket.on("message", (data) => {
    console.log(data);
    socketIO.emit("response", data);
  });
  socket.on("disconnect", () => {
    console.log(`user disconnect: ${socket.id}`);

  });
});

http.listen(3001, () => {
  console.log("server is running");
});
