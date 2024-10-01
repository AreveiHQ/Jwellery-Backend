const mongoose = require('mongoose');
const chalk = require('chalk');

require("dotenv").config();
const DB_URL=process.env.DB_URL;
// const DB_URL="mongodb+srv://ktyrrishabh99361032:shIrPOu14HdECsaj@rishabh.cytugvr.mongodb.net/Jwellery?retryWrites=true&w=majority&appName=rishabh";
mongoose.connect(DB_URL)
.then(()=>console.log(chalk.bgGreen("DB Connection Established")))
.catch((err)=>{console.log(chalk.bgRed("Error while connecting DB : ",err))});
