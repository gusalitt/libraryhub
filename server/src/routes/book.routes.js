const express = require('express');
const bookController = require('../controllers/book.controller');
const authenticate = require('../middlewares/authenticate.js');
const { commentValidation } = require('../validators/bookValidator.js');
const router = express.Router();

router.get('/:slug/download', bookController.downloadBookFile);

router.get('/:slug/reading', bookController.getBookReadingPage);

router.post('/:slug/comments', authenticate, commentValidation, bookController.addBookComment);

router.get('/:slug', bookController.getBookDetailData);

module.exports = router;