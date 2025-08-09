const express = require('express');
const landingController = require('../controllers/landing.controller');
const router = express.Router();

router.get('/', landingController.getLandingData);
router.get('/books', landingController.getFilteredBooksData);
router.get('/categories', landingController.getAllCategoriesData);
router.get('/about', landingController.getAboutData);

module.exports = router;