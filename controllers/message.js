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
	const recipient_id = req.body.recipient_id;

	const message = new Message(content, user_id, recipient_id);
	message.save()
		.then(result => res.status(201).json(result))
		.catch(err => {
			const error = new Error('Error posting new message');
			error.statusCode = 422;
			next(error);
		});
}

exports.getMessagesByConvo = (req, res, next) => {
	const sender_id = req.body.sender_id;
	const recipient_id = req.params.recipient_id;

	Message.fetchAll(sender_id, recipient_id)
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