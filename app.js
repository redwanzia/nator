const fs = require('fs');
const http = require('http');
const express = require('express');

const app = express();
// body parser middleware:
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours: tours }
  });
});
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;

  if(id > tour.length){
    return res.status(404).json({
      status:'fail',
      message:'Invalid ID'
    })
  }

  const tour = tours.find(tour => tour.id === id);

  req.status(200).json({
    status: 'success',
    data: {tour}
    })

  })


  res.status(200).json({
    status: 'success'
    // results: tours.length,
    // data: { tours: tours }
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour
        }
      });
    }
  );
});

const port = 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
