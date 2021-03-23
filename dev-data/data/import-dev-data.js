const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then((connection) => console.log('mongo db connected'));

// Read JSON file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8'));

// Import data to databases
const importData = async () => {
	try {
		await Tour.create(tours);
		console.log(`data successfully created`);
		process.exit();
	} catch (err) {
		console.log(err);
	}
};

// delete all data from collection

const deleteData = async () => {
	try {
		await Tour.deleteMany();
		console.log(`data successfully deleted`);
		process.exit();
	} catch (ere) {
		console.log(err);
	}
};

if (process.argv[2] === '--import') {
	importData();
} else if (process.argv[2] === '--delete') {
	deleteData();
}

// PROCESS.ARGV
// run 'node dev-data/data/import-dev-data.js' in the terminal that will return an arry of two strings
// quit the process add '--import' flag to 'node dev-data/data/import-dev-data.js' eg.''node dev-data/data/import-dev-data.js --import'. The import flag will be updated as the third element in the arry

// console.log(process.argv);
