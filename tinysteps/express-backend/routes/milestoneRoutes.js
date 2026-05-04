"use strict";
const express = require("express");
const router = express.Router();
const milestoneController = require('../controllers/milestoneController');

const cors = require('cors');

const corsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};

router.use(cors(corsOptions));

// GET all milestones
router.get("/", milestoneController.fetchAllMilestones);

// GET milestones for a specific kid - this needs to come before /:id so it doesn't get confused
router.get("/kid/:kidName", milestoneController.fetchMilestonesByKid);

// GET one milestone by id
router.get("/:id", milestoneController.fetchMilestoneById);

// POST create a new milestone
router.post("/", milestoneController.createMilestone);

// PUT update a milestone
router.put("/:id", milestoneController.editMilestone);

// DELETE a milestone
router.delete("/:id", milestoneController.removeMilestone);

module.exports = router;
