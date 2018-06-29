const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

var id = '5b365b2c6a10b6141c95a9151';//added 1


User.findById(id).then((userById)=>{
  if(!userById){
      return console.log("Id is Invalid");
  }
  console.log(JSON.stringify(userById,undefined,2));
}).catch((e)=> console.log(e));

/*
Todo.find({
  _id : id
}).then((todos)=>{
  console.log("Todos:\n",todos);
});

Todo.findOne({
  _id:id
}).then((todo)=>{
  console.log("Todo:\n",todo);
});

if(!ObjectID.isValid(id)){
  console.log("Id not valid");
}
Todo.findById(id).then((todoById)=>{
  if(!todoById){
    return console.log("ID not found");
  }
  console.log("TodoById:\n",todoById);
}).catch((e)=>{
  console.log(e);
});
*/
