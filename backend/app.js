const express = require('express');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Routes
app.use(require('./routes/user'));
app.use(require('./routes/chatroom'));

//Error Handlers
const errorHandlers = require("./handlers/errorHandler");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
if(process.env.ENV === "DEVELOPMENT"){
    app.use(errorHandlers.developmentErrors);
}
app.use(errorHandlers.productionErrors);


module.exports = app;