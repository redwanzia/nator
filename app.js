const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('hello from the server side');
});

const port = 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
