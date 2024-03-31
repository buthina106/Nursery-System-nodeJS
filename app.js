require("dotenv").config();
const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const TeacherRoute = require("./Routs/teacherRouts");
const studentRoute=require("./Routs/childRoute");
const ClassRoute=require("./Routs/classRoute");
const upload = require('./imageUpload');

const loginRoute = require("./Routs/authenticationRoute");
const authenticationMW = require("./MadelWare/authenticationMW");
const mongoose=require("mongoose");

const server = express();
const port = process.env.PORT;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API",
      version: "1.0.0",
      description: "Documentation for your API",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Local server",
      },
      
    ],
  },
  apis: ["./app.js"],
};
const specs = swaggerJsdoc(options);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(upload);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected....");
    server.listen(port, () => {
      console.log(process.env.NODE_MODE)
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

server.use(loginRoute);
server.use(authenticationMW);

server.use(TeacherRoute);
server.use(studentRoute);
server.use(ClassRoute);



server.use((request, response) => {
  response.status(404).json({ data: "Not Found" });
});


server.use((error, request, response, next) => {
  response.status(500).json({ data: `Error MW ${error}` });
});