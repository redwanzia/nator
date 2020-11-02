const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(connection => console.log('mongo db connected'));

// Schema///

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The park camper',
  rating: 4.5,
  price: 997
});

testTour
  .save()
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log('Error:', err);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
