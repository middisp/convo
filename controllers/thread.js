const { validationResult } = require('express-validator');
const Thread = require('../models/thread');

const userMessages = require('../utils/userMessages');

exports.postAddThread = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			message: 'Validation failed, entered data is incorrect.',
			errors: errors.array()
		});
	}
	const members = req.body.members;
	const user_id = req.body.user_id;
	const name = req.body.name;
	const description = req.body.description;

	const thread = new Thread(user_id, members, name, description);
	thread.save()
		.then(result => res.status(201).json(result))
		.catch(err => {
			const error = new Error('Error posting new message');
			error.statusCode = 422;
			next(error);
		});
}

exports.getThreads = (req, res, next) => {
	const user_id = req.params.user_id;

	Thread.fetchAll(user_id)
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.putUpdateThread = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			message: 'Validation failed, entered data is incorrect.',
			errors: errors.array()
		});
	}
	const thread_id = req.body.message_id;

	Thread.updateThread(thread_id, { thread })
		.then((thread) => {
			res.status(200).json(thread);
		})
		.catch(() => {
			const error = new Error('Error updating message');
			error.statusCode = 422;
			throw error;
		});
}

exports.deleteMessage = (req, res, next) => {
	const message_id = req.body.message_id;

	Message.deleteMessage(message_id)
		.then(() => {
			res.render()
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}