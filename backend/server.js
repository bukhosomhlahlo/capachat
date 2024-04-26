require('dotenv').config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology:true,
    useNewUrlParser:true,
});

mongoose.connection.on('error', (err)=> {
    console.log("Mongoose Connection Error: " + err.message);
});

mongoose.connection.once('open',()=>{
    console.log("Ze MongoDB is Connected Successfully!")
});

//Models
require('./models/User');
require('./models/Messages');
require('./models/Chatroom');

const app = require('./app');

app.listen(8080, () => {
    console.log("Server running on port 8080");
});