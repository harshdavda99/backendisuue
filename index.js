require('./mongoconnet')
const express = require("express")
const  bodyParser =require("body-parser");
const  mongoose =require( "mongoose");
const fileupload = require('express-fileupload');
const  cors =require("cors");

const app = express();

const dotenv = require("dotenv")  
dotenv.config({path:"./config.env"})

app.use(fileupload())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));  
app.use(cors());
app.use('/posts',require("./routes/post")); 
app.use (express.static('public'))



app.get('/',(req,res)=>{
  res.send('Service Started ')
});


const CONNECTION_URL =process.env.DATABASE
const PORT = process.env.PORT || 5012;

mongoose
.connect(CONNECTION_URL).then(()=>{console.log('...')})
  .then(() =>
    app.listen(PORT, () => console.log(`server runnunig on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));