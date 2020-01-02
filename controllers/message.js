const { validationResult } = require('express-validator');
const Message = require('../models/message');

const userMessages = require('../utils/userMessages');

exports.postAddMessage = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		const error = new Error(userMessages.generic.validationFailed);
		error.statusCode = 422;
		throw error;
	}
	const content = req.body.content;
	const user_id = req.body.user_id;
	const channel_id = req.body.channel_id;

	const message = new Message(content, user_id, channel_id);
	message.save()
		.then(result => res.status(201).json({ result }))
		.catch(err => {
			console.log(`Error: ${err}`)
			const error = new Error('Error posting new message');
			error.statusCode = 422;
			next(error);
		});
}

exports.getAllMessages = (req, res, next) => {
	const channel_id = req.params.channel_id;

	Message.fetchAll(channel_id)
		.then(messages => {
			res.status(200).json({
				messages: messages
			})
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