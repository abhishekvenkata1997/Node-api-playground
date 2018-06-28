const MongoClient = require('Mongodb').MongoClient;
const ObjectID = require('MongoDb').ObjectID;

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

//    db.collection('Todos').insertOne({
//      text:'Walk The Dog',
//      completed:true
//    },(err,result)=>{
//      if(err){
//        return console.log("Failed TO insert to NewExample");
//      }
//      console.log("Succeeded in entering USer basic details to NewExample in MongoDB");
//      console.log(JSON.stringify(result.ops,undefined,2));
//      console.log(result.ops[0]._id.getTimestamp());
//    });
//    client.close();
//  });

//    db.collection('Todos').find({
//      _id : new ObjectID("5b3412c60138252e44b4b49d")
//    }).toArray().then((docs)=>{
//      console.log("Todos");
//      console.log(JSON.stringify(docs,undefined,2));
//    },(err)=>{
//      console.log("SOme error in reading todos collection");
//    });
//  });

//    db.collection('Todos').find().count().then((count)=>{
//      console.log(`Todos Count:${count}`);
//    },(err)=>{
//      console.log("Error in fetching Todos");
//    });
//  });

//    db.collection('NewExample').deleteMany({name:'Abhishek'}).then((result)=>{
//      console.log(result);
//    });
//  });


    db.collection('NewExample').findOneAndDelete({_id : ObjectID("5b34c5e76a10b6141c958314")}).then((result)=>{
      console.log(result);
    });
  });
