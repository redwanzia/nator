const express = require('express');

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

const router = express.Router();
router.route('/').get(getAllTUsers).post(createUsers);
router.route('/:id').get(getUser).patch(updateUsers).delete(deleteUsers);

module.exports = router;
