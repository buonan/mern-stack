import fetch from 'node-fetch';
const mongo_host = process.env.MONGO_HOST === undefined ? 'localhost' : process.env.MONGO_HOST
const mongo_port = process.env.MONGO_PORT === undefined ? '27017' : process.env.MONGO_PORT

module.exports = function (app) {
  "use strict";
  app.get('/health', Health);

  function Health(req, res) {
    res.setHeader('Content-Type', 'application/json');
    fetch(`http://${mongo_host}:${mongo_port}`).then((r) => {
      const mongo_body = r.body.read().toString()
      const mongo_health = mongo_body.includes("MongoDB")
      res.end(JSON.stringify({
        ok: true,
        mongo: mongo_health,
      }, null, 3));
    }).catch((e)=> {
      res.end(JSON.stringify({
        ok: true,
        mongo: e.toString(),
      }, null, 3));
    })
  }
}