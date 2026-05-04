"use strict";
const pool = require('./dbConnection');

// Get all milestones
async function getAllMilestones() {
    const queryText = "SELECT * FROM milestones ORDER BY milestone_date DESC";
    const result = await pool.query(queryText);
    return result.rows;
}

// Get one milestone by id
async function getMilestoneById(id) {
    const queryText = "SELECT * FROM milestones WHERE id = $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

// Get milestones filtered by kid name
async function getMilestonesByKid(kidName) {
    const queryText = "SELECT * FROM milestones WHERE kid_name = $1 ORDER BY milestone_date DESC";
    const values = [kidName];
    const result = await pool.query(queryText, values);
    return result.rows;
}

// Add a new milestone
async function addMilestone(milestoneName, kidName, milestoneDate) {
    const queryText = "INSERT INTO milestones (milestone_name, kid_name, milestone_date) VALUES ($1, $2, $3) RETURNING *";
    const values = [milestoneName, kidName, milestoneDate];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

// Update a milestone
async function updateMilestone(id, milestoneName, kidName, milestoneDate) {
    const queryText = "UPDATE milestones SET milestone_name = $1, kid_name = $2, milestone_date = $3 WHERE id = $4 RETURNING *";
    const values = [milestoneName, kidName, milestoneDate, id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

// Delete a milestone
async function deleteMilestone(id) {
    const queryText = "DELETE FROM milestones WHERE id = $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

module.exports = {
    getAllMilestones,
    getMilestoneById,
    getMilestonesByKid,
    addMilestone,
    updateMilestone,
    deleteMilestone
};
