const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    done();
  });
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
        Todo.find({}).then((todos)=>{
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
      Todo.find({}).then((todos)=>{
        expect(todos.length).toBe(0);
        done();
      }).catch((e)=> done(e));
    });
  });
});
