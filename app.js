const express = require('express');
//let axios = require('axios');
//var app = express();
const axios = require('axios')
const app = express();


app.use(express.json());

app.get('/', function(req, res) {
  return res.send('Hello World!');
});

app.post('/', function(req, res, next) {
  console.log("req.body:");
  console.log(req.body);
  try {
    let results = req.body.developers.map(async d => {
      res = await axios.get(`https://api.github.com/users/${d}`);
      console.log("res.data:");
      console.log(res.data);
      return res;
    });
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch(err) {
    next(err);
  }
});

app.listen(3000);
