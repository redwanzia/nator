const express = require('express');
const APIFeatures = require('../utils/apiFeatures');

const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );
exports.aliasTopTour = (req, res, next) => {
	req.query.limit = '5';
	req.query.sort = '-ratingAverage,price';
	req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
	next();
};

exports.getAllTours = async (req, res) => {
	try {
		// EXECUTE QUERY

		const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
		const tours = await features.query;

		// SEND RESPONDS
		res.status(200).json({
			status: 'success',
			results: tours.length,
			data: { tours: tours }
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error
		});
	}
};

exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id);
		res.status(200).json({
			status: 'success',
			data: { tour: tour }
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error
		});
	}
};

exports.createTour = async (req, res) => {
	try {
		const newTour = Tour.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				tours: newTour
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err
		});
	}
};

exports.updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		res.status(200).json({
			status: 'success',
			data: { tour: 'updated tour' }
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'invalid data sent'
		});
	}
};

exports.deleteTour = async (req, res) => {
	try {
		await Tour.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: 'success',
			data: null
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'can not be deleted'
		});
	}
};
