import fetch from 'node-fetch';
const mongo_host = process.env.MONGO_HOST === undefined ? 'localhost' : process.env.MONGO_HOST
const mongo_port = process.env.MONGO_PORT === undefined ? '27017' : process.env.MONGO_PORT

module.exports = function (app) {
  "use strict";
  app.get('/health', Health);
  app.get('/health_check', HealthCheck);

  function Health(req, res) {
    res.setHeader('Content-Type', 'application/json');
    fetch(`http://${mongo_host}:${mongo_port}`).then((r) => {
      const mongo_body = r.body.read().toString()
      const mongo_health = mongo_body.includes("MongoDB")
      var health = JSON.stringify({
        ok: true,
        mongo: mongo_health,
      }, null, 3)
      console.log(`Health ${health}`)
      res.end(health);
    }).catch((e) => {
      res.end(JSON.stringify({
        ok: true,
        mongo: e.toString(),
      }, null, 3));
    })
  }

  function HealthCheck(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send()
  }
}