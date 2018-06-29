const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');


const todos = [
  { text :"first Todo test"},
  { text :"Second Todo test"}
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
