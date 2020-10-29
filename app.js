const http = require('http');
const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// body parser middleware:
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 5000;
app.listen(port, () => {
	console.log(`App listening on port ${port}...`);
});
