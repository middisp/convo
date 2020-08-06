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

	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	let password = req.body.password;

	bcrypt.hash(password, 12)
		.then(hashedPassword => {
			const user = new User(firstName, lastName, email, hashedPassword);
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
		.catch((error) => next(error));
};

exports.postAllUsers = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error(userMessages.generic.validationFailed)
		error.statusCode = 422;
		throw error;
	}
	const email = req.body.email;

	User.getUserByEmail(email)
		.then(user => {
			delete user.password;
			res.status(200).json(user)
		})
		.catch((error) => next(error));
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

	User.updateUser(id, user)
		.then(user => {
			delete user.password;
			res.status(200).json(user);
		})
		.catch(error => next(error));
}

exports.putUpdateMateRequest = (req, res, next) => {
	const id = req.params.user_id;
	const friendRequest = req.body; // {id: xxx, status: ["declined" | "accepted"]}

	const updateFriendData = (user, requestId) => {
		const mates = user.mates;
		const now = new Date();
		// loop mates - match $id to mates[i].id
		const index = mates.findIndex(({ _id }) => _id === requestId);
		mates[index].status = friendRequest.status;
		mates[index].modifiedAt = now;
		return user
	}

	let updatedUser;
	User.getUser(id)
		.then(user => {
			// get mates.
			return User.updateUser(id, updateFriendData(user, friendRequest._id));
		})
		.then((user) => {
			updatedUser = user;
			return User.getUser(friendRequest._id);
		})
		.then(user => {
			// get mates.
			return User.updateUser(friendRequest._id, updateFriendData(user, id));
		})
		.then(() => {
			console.log(updatedUser);
			res.status(200).json(updatedUser);
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