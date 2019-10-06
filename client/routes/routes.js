const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../../public/views/index.html'));
});

router.get('/login', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../../public/views/login.html'));
});

router.get('/logout', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../../public/views/logout.html'));
});

router.get('/profile', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../../public/views/profile.html'));
});

router.get('/settings', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../../public/views/login.html'));
});

module.exports = router;