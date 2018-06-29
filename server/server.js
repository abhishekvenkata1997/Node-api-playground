const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');

var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();


app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
      text:req.body.text
    });

    todo.save().then((doc)=>{
      res.send(doc);
    },(e)=>{
      res.status(400).send(e);
    });
});


//GET /todos/i... To get the specific todo
app.listen(3000,()=>{
  console.log("Server starts running on localhost:3000");
})

module.exports = {
  app
}
