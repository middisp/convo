const Channel = require('../models/channel');

exports.postAddChannel = (req, res, next) => {
  const name = req.body.name;
  const userId = req.body.userId;

  const message = new Channel(name, userId);
  message.save()
    .then(result => res.send(result))
    .catch(err => {
      console.log(`Error: ${err}`);
      throw err;
    });
}

exports.getAllChannels = (req, res, next) => {
  const userId = req.params.userId;

  Channel.fetchAll(userId)
    .then(channels => {
      res.render({
        channels: channels
      })
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      throw err;
    });
}

exports.putUpdateChannel = (req, res, next) => {
  const channelId = req.body.channelId;

  Channel.updateChannel(channelId)
    .then(() => {
      res.render()
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      throw err;
    });
}

exports.deleteChannel = (req, res, next) => {
  const channelId = req.body.channelId;

  Channel.deleteChannel(channelId)
    .then(() => {
      res.render()
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      throw err;
    });
}