const { validationResult } = require('express-validator');
const Message = require('../models/message');

const userMessages = require('../utils/userMessages');

exports.postAddMessage = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error(userMessages.generic.validationFailed);
		error.statusCode = 422;
		throw error;
	}
	const content = req.body.content;
	const user_id = req.body.user_id;
	const thread_id = req.body.thread_id;

	const message = new Message(content, user_id, thread_id);
	message.save()
		.then(result => res.status(201).json(result))
		.catch(err => {
			const error = new Error('Error posting new message');
			error.statusCode = 422;
			next(error);
		});
}

exports.getMessagesByThread = (req, res, next) => {
	const thread_id = req.params.thread_id;

	Message.fetchAll(thread_id)
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.putUpdateMessage = (req, res, next) => {
	const message_id = req.body.message_id;

	Message.updateMessage(message_id)
		.then(() => {
			res.render()
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
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