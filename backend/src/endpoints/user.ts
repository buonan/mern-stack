const userModel = require('../models/user');

module.exports = function (app) {
  "use strict";
  app.get('/users', GetUsers);
  app.get('/user/:id', GetUser);
  app.post('/user', CreateUser);
  app.delete('/user/:id', DeleteUser);
  app.put('/user/:id', UpdateUser);

  // curl localhost:8080/users
  async function GetUsers(req, res) {
    try {
      const users = await userModel.find({});
      res.send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // curl localhost:8080/user/5fed9a2d3f7416ac7adfd57b
  async function GetUser(req, res) {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) res.status(404).send("No item found")
      res.send(user);
    } catch (e) {
      console.log(`GetUser error ${e}`)
      res.status(500).send(e);
    }
  }

  // curl -XPOST localhost:8080/user -H "Content-Type: application/json"  --data '{ "name": "bob", "password": "asdf" }'
  async function CreateUser(req, res) {
    try {
      const user = new userModel(req.body);
      await user.save();
      res.send(user);
    } catch (e) {
      console.log(`CreateUser error ${e}`)
      res.status(500).send(e);
    }
  }

  // curl -XDELETE localhost:8080/user/5fed9a2d3f7416ac7adfd57b
  async function DeleteUser(req, res) {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id)
      if (!user) {
        res.status(200).send()
      }
    } catch (e) {
      console.log(`DeleteUser error ${e}`)
      res.status(500).send(e)
    }
  }

  // curl -XPUT localhost:8080/user/5fed9f50cb0d93b0ee7ab774 -H "Content-Type: application/json"  --data '{ "name": "bob", "password": "asdf" }'
  async function UpdateUser(req, res) {
    try {
      userModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((updated) => {
        if (!updated) res.status(404).send("No item found")
        res.send(updated);
      })
    } catch (e) {
      console.log(`UpdateUser error ${e}`)
      res.status(500).send(e)
    }
  }
}