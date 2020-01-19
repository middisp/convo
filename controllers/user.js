const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const userMessages = require('../utils/userMessages');

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
		return res.status(422).json({
			message: userMessages.generic.validationFailed,
			errors: errors.array()
		});
	}
	const id = req.params.user_id;
	const user = req.body.user;

	User.updateUser(id, user)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch(() => {
			const error = new Error('Error updating user');
			error.statusCode = 422;
			throw error;
		});
}