const express=require('express');
const app = express();

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

const blogsRouter = require('./blog-post-router');

app.use('/blogs/api', jsonParser, blogsRouter);

app.listen(8080, () =>{
    console.log("Your app is running in port 8080");
});