const express = require("express");
const TeacherRoute = require("./Routs/teacherRouts");
const studentRoute=require("./Routs/childRoute");
const ClassRoute=require("./Routs/classRoute");
const bodyParser = require('body-parser');

// const loginRoute = require("./Routs/authenticationRoute");
// const authenticationMW = require("./MadelWare/authenticationMW");
const mongoose=require("mongoose");

const server = express();
const port = process.env.PORT || 8080;

mongoose
  .connect("mongodb://127.0.0.1:27017/itiSystem")
  .then(() => {
    console.log("Connected....");
    server.listen(port, () => {
      console.log("I am listening.........", port);
    });
  })
  .catch((error) => {
    console.log("DB Problem ..." + error);
  });


// first MW
server.use((request, response, next) => {
  console.log(request.url, request.method);
  next();
});

server.use(express.json());
// server.use(loginRoute);
// server.use(authenticationMW);

server.use(TeacherRoute);
server.use(studentRoute);
server.use(ClassRoute);
server.use(bodyParser.urlencoded({ extended: false}));
server.use(bodyParser.json());

server.use((request, response) => {
  response.status(404).json({ data: "Not Found" });
});


server.use((error, request, response, next) => {
  response.status(500).json({ data: `Error MW ${error}` });
});