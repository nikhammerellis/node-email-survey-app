const express = require('express'); //common js module syntax, only module syntax node supports
//import express from 'express'; <- this wont work, this is ES2015 Modules and is not supported in Node (works in React)
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000; //use env.PORT for heroku dynamic port binding
app.listen(PORT);
