const { validationResult } = require('express-validator');
const User = require('../models/user');

const userMessages = require('../utils/userMessages');

exports.postAddUser = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		const error = new Error(userMessages.generic.validationFailed);
		error.statusCode = 422;
		throw error;
	}

	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;

	const user = new User(name, email, password);
	user.save()
		.then(result => res.status(201).json(result))
		.catch(err => {
			const error = new Error('Error creating user');
			error.statusCode = 422;
			throw error;
		});
};

exports.getUser = (req, res, next) => {
	const id = req.params.id;

	User.getUser(id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		})
};

exports.getAllUsers = (req, res, next) => {
	const channel_id = req.params.channel_id;

	User.fetchAll(channel_id)
		.then(users => {
			res.status(200).json(users)
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
};

exports.putUpdateUser = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		const error = new Error(userMessages.generic.validationFailed);
		error.statusCode = 422;
		throw error;
	}
	const id = req.params.user_id;

	User.updateUser(id, { name: 'Pete Middis' })
		.then((user) => {
			res.status(200).json(user);
		})
		.catch(err => {
			const error = new Error('Error updating user');
			error.statusCode = 422;
			throw error;
		});
}

exports.deleteUser = (req, res, next) => {
	const id = req.body.user_id;

	User.deleteUser(id)
		.then(() => {
			res.render()
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}