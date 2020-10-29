const fs = require('fs');
const http = require('http');
const express = require('express');

const app = express();
// body parser middleware:
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: { tours: tours }
	});
};

const getTour = (req, res) => {
	const id = req.params.id * 1;

	if (id > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID'
		});
	}

	const tour = tours.find((tour) => tour.id === id);

	req.status(200).json({
		status: 'success',
		data: { tour }
	});
};

const createTour = (req, res) => {
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);

	tours.push(newTour);

	fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
		res.status(201).json({
			status: 'success',
			data: {
				tours: newTour
			}
		});
	});
};

const updateTour = (req, res) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID'
		});
	}
	res.status(200).json({
		status: 'success',
		data: { tour: 'updated tour' }
	});
};

const deleteTour = (req, res) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID'
		});
	}
	res.status(204).json({
		status: 'success',
		data: null
	});
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const getAllTUsers = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
};
const getUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
};
const createUsers = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
};

const updateUsers = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
};

const deleteUsers = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
};

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllTUsers).post(createUsers);
userRouter.route('/:id').get(getUsers).patch(updateUsers).delete(deleteUsers);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 5000;
app.listen(port, () => {
	console.log(`App listening on port ${port}...`);
});
