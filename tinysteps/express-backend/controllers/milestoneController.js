"use strict";
const model = require('../models/milestoneModel');

// GET /milestones - get all milestones
async function fetchAllMilestones(req, res) {
    try {
        const milestones = await model.getAllMilestones();
        res.json(milestones);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error, couldn't get milestones");
    }
}

// GET /milestones/:id - get one milestone by id
async function fetchMilestoneById(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send("Missing required id param!");
    }
    try {
        const milestone = await model.getMilestoneById(id);
        if (!milestone) {
            return res.status(404).send("Milestone not found");
        }
        res.json(milestone);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

// GET /milestones/kid/:kidName - get milestones for a specific kid
async function fetchMilestonesByKid(req, res) {
    const kidName = req.params.kidName;
    if (!kidName) {
        return res.status(400).send("Missing required kidName param!");
    }
    try {
        const milestones = await model.getMilestonesByKid(kidName);
        res.json(milestones);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

// POST /milestones - add a new milestone
async function createMilestone(req, res) {
    const { milestone_name, kid_name, milestone_date } = req.body;
    if (!milestone_name || !kid_name || !milestone_date) {
        return res.status(400).send("Missing required fields: milestone_name, kid_name, milestone_date");
    }
    try {
        const newMilestone = await model.addMilestone(milestone_name, kid_name, milestone_date);
        res.status(201).json(newMilestone);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error, couldn't create milestone");
    }
}

// PUT /milestones/:id - update a milestone
async function editMilestone(req, res) {
    const id = req.params.id;
    const { milestone_name, kid_name, milestone_date } = req.body;
    if (!id) {
        return res.status(400).send("Missing required id param!");
    }
    if (!milestone_name || !kid_name || !milestone_date) {
        return res.status(400).send("Missing required fields!");
    }
    try {
        const updated = await model.updateMilestone(id, milestone_name, kid_name, milestone_date);
        if (!updated) {
            return res.status(404).send("Milestone not found");
        }
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error, couldn't update milestone");
    }
}

// DELETE /milestones/:id - delete a milestone
async function removeMilestone(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send("Missing required id param!");
    }
    try {
        const deletedCount = await model.deleteMilestone(id);
        if (deletedCount > 0) {
            res.send(`Milestone with id ${id} deleted successfully.`);
        } else {
            res.status(404).send("Milestone not found.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error, couldn't delete milestone");
    }
}

module.exports = {
    fetchAllMilestones,
    fetchMilestoneById,
    fetchMilestonesByKid,
    createMilestone,
    editMilestone,
    removeMilestone
};
