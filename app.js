const fs = require('fs');
const express = require('express');
const app = express();

const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json}`);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).send({
    status: 'success',
    data: { tours }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
