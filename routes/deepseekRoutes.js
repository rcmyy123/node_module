const express = require('express');
const router = express.Router();
const { chatCompletion } = require('../controllers/deepseekController');

// POST /api/deepseek/chat
router.post('/chat', chatCompletion);

module.exports = router;