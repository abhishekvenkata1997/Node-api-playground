const _ = require('lodash');
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
var {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');


const todos = [
  { _id : new ObjectID(),
    text :"first Todo test"},
  {
    _id : new ObjectID(),
    text :"Second Todo test",
    completed:true,
    completedAt:333
  }
]

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
     Todo.insertMany(todos);
  }).then(()=>done());
  });

describe('Post/todos',()=>{
  it("should create Todo",(done)=>{
      var text = "test todo text";

      request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }
        Todo.find({text:"test todo text"}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        });
      });

  });

  it("Should not create todo for bad data",(done)=>{
    var text = "test todo text";

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      }).catch((e)=> done(e));
    });
  });
});



describe(" GET /todos",()=>{

  it("Should get all the Todos",(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);

  });
});

describe("GET /todos/:id",()=>{

    it("Should return doc",(done)=>{
      request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.text).toBe(todos[0].text);
      })
      .end(done);
    });
var _id1 = new ObjectID().toHexString();
    it('Should send 404 for ObjectId not yet occupied',(done)=>{

      request(app)
      .get(`/todos/${todos[0]._id1}`)
      .expect(404)
      .end(done);

    });

    it("should have 400 for non-object Ids",(done)=>{
      request(app)
      .get(`/todos/1232`)
      .expect(404)
      .end(done);
    });
});


describe("DELETE todos/:id",()=>{
  it("should return 200 and must delete the item",(done)=>{
      request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.text).toBe(todos[0].text);
      })
      .end(done);
    });

    var id1 = new ObjectID().toHexString();
  it("should return 400  if todo not found",(done)=>{
      request(app)
      .delete(`/todos/${todos[0]._id1}`)
      .expect(404)
      .end(done);

  });

  it("Should return 404 if the id Is not even valid",(done)=>{
    request(app)
    .delete('/todos/1234')
    .expect(404)
    .end(done);
  });

});

describe("PATCH todos/:id",()=>{
  it("Should update the Todo",(done)=>{
    var id = todos[0]._id.toHexString();
    request(app)
    .patch(`/todos/${id}`)
    .send({text:"Testing For patch",completed:true})
    .expect(200)
    .expect((res)=>{
      expect(typeof res.body.todos.completedAt).toBe('number');
    })
    .end(done);
  });

  it("should send a null completedAt as null if completed is False ",(done)=>{
    var id = todos[0]._id.toHexString();
    request(app)
    .patch(`/todos/${id}`)
    .send({text:"Testing for patch",completed:false})
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.completedAt).toBeNull();
    })
    .end(done);
  });

  it("shoulde send error 400 for  ID that doesnt exist ",(done)=>{
    var id1 = new ObjectID().toHexString();
    request(app)
    .patch(`/todos/${id1}`)
    .send({text:"Hey",completed:true})
    .expect(400)
    .end(done);
  });

  it("Should return 404 if id is INvalid",(done)=>{
    request(app)
    .patch('/todos/1244')
    .send({text:"hey",completed:true})
    .expect(404)
    .end(done);
  });
});
