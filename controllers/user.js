const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const userMessages = require('../utils/userMessages');
const mockData = require('../utils/MOCK_DATA');

exports.postAddUser = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error(userMessages.generic.validationFailed)
		error.statusCode = 422;
		throw error;
	}

	const name = req.body.name;
	const email = req.body.email;
	let password = req.body.password;

	bcrypt.hash(password, 12)
		.then(hashedPassword => {
			const user = new User(name, email, hashedPassword);
			return user.save();
		})
		.then(result => {
			res.status(201).json(result);
		})
		.catch((error) => next(error));
};

exports.getUser = (req, res, next) => {
	const id = req.params.id;

	User.getUser(id)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			const error = new Error('Error fetching user');
			throw error;
		});
};

exports.getAllUsers = (req, res, next) => {
	const channel_id = req.params.channel_id;

	User.fetchAll(channel_id)
		.then(users => {
			res.status(200).json(users)
		})
		.catch(err => {
			const error = new Error('Error fetching users');
			throw error;
		});
};

exports.putUpdateUser = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error(userMessages.generic.validationFailed)
		error.statusCode = 422;
		throw error;
	}
	const id = req.params.user_id;
	const user = req.body;

	console.log(req.body);

	User.updateUser(id, user)
		.then(() => User.getUser(id))
		.then((user) => {
			res.status(200).json(user);
		})
		.catch(error => next(error));
}

exports.postAddTestData = (req, res, next) => {

	mockData.map(user => {
		const firstName = user.firstName;
		const lastName = user.lastName;
		const email = user.email;
		const password = 'password';

		bcrypt.hash(password, 12)
			.then(hashedPassword => {
				const user = new User(firstName, lastName, email, hashedPassword);
				return user.save();
			})
			.then(() => {
				console.log('done');
			})
			.catch((error) => next(error));
	});

	res.status(200).json({ message: 'done' });
}