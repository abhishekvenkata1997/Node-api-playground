const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');

var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;


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

app.get('/todos',(req,res)=>{
  Todo.find({}).then((todos)=>{
    res.send({todos})
  },(err)=>{
    res.status(400).send(err);
  });
});

//GET /todos/:id To get the specific todo
app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
      return res.status(404).send();
    }
    Todo.findById(id).then((todos)=>{
      if(!todos){
        return res.status(404).send();
      }
      res.send({todos});
    }).catch((e)=> {
      res.status(400).send();
    });
});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todos)=>{
    if(!todos){
      return res.status(400).send();
    }
    res.send(todos);
  }).catch((e)=>{
    res.status(404).send();
  });
});


app.listen(port,()=>{
  console.log(`Server starts running on ${port}`);
})

module.exports = {
  app
}
