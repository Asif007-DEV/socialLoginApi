require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");

const indexRoute = require("./routes");

app.use(express.json());
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URL,{useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>console.log("Database Connected"));

app.use("/api",indexRoute);

app.listen(process.env.PORT,()=>console.log("Server runing on port: ",process.env.PORT));
