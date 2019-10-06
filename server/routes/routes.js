const express = require('express');

const router = express.Router();

router.post('/login', (req, res, next) => {
  res.setHeader('Content-Type', 'text/json');
});

router.post('/logout', (req, res, next) => {
  res.setHeader('Content-Type', 'text/json');
});

router.post('/message', (req, res, next) => {
  res.setHeader('Content-Type', 'text/json');
});

router.get('/messages', (req, res, next) => {
  res.setHeader('Content-Type', 'text/json');
});

router.get('/profile/:userId', (req, res, next) => {
  res.setHeader('Content-Type', 'text/json');
});

// router.get('/characters', controllers.getCharacters);

// router.get('/characters/:characterId', controllers.getCharacter);

module.exports = router;