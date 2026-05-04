"use strict";
const express = require("express");
const router = express.Router();
const newsController = require('../controllers/newsController');

const cors = require('cors');

const corsOptions = {
    methods: 'GET',
    credentials: true
};

router.use(cors(corsOptions));

// GET baby-related news articles
router.get("/", newsController.fetchBabyNews);

module.exports = router;
