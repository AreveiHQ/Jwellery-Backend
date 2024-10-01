const express = require('express');
const chalk = require('chalk');
const app = express();
const cors = require("cors")
require("./db")
const PORT_NO = process.env.PORT_NO||3000;
const rootRouter=require("./Routes/index");
require('dotenv').config();


app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(PORT_NO,()=>{
    console.log(chalk.blue(`Myntra Backend Server Running on Port :${PORT_NO}`));
});

