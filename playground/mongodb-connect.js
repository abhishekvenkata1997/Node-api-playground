const MongoClient = require('Mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err){
    return console.log("There's been an error connecting to the MongoDB Server");
  }
  console.log("Succeeded in connecting to MongoDB Server");
  var db = client.db('TodoApp');

//  db.collection('Todos').insertOne({
//    text:"Do something",
//    completed: false
//  },(err,result)=>{
//    if(err){
//      return console.log("Inserting field Doesnt work Correctly");
//    }
//    console.log("Inserting Opn to MongoDB ExecuteD!");
//    console.log(JSON.stringify(result.ops,undefined,2));
//  });
//  client.close();
//});

    db.collection('NewExample').insertOne({
      name:'Abhishek',
      age:20,
      Location:'Hyderabad'
    },(err,result)=>{
      if(err){
        return console.log("Failed TO insert to NewExample");
      }
      console.log("Succeeded in entering USer basic details to NewExample in MongoDB");
      //console.log(JSON.stringify(result.ops,undefined,2));
      console.log(result.ops[0]._id.getTimestamp());
    });
    client.close();
  });
