import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const MilestonesService = {
    // Get all milestones
    getMilestones: () => {
        return axios.get(`${BACKEND_URL}/milestones`, { withCredentials: true });
    },

    // Get milestones for a specific kid
    getMilestonesByKid: (kidName) => {
        return axios.get(`${BACKEND_URL}/milestones/kid/${kidName}`, { withCredentials: true });
    },

    // Get one milestone by id
    getMilestoneById: (id) => {
        return axios.get(`${BACKEND_URL}/milestones/${id}`, { withCredentials: true });
    },

    // Create a new milestone
    createMilestone: (milestoneData) => {
        return axios.post(`${BACKEND_URL}/milestones`, milestoneData, { withCredentials: true });
    },

    // Update a milestone
    updateMilestone: (id, milestoneData) => {
        return axios.put(`${BACKEND_URL}/milestones/${id}`, milestoneData, { withCredentials: true });
    },

    // Delete a milestone
    deleteMilestone: (id) => {
        return axios.delete(`${BACKEND_URL}/milestones/${id}`, { withCredentials: true });
    },

    // Get baby news articles
    getBabyNews: () => {
        return axios.get(`${BACKEND_URL}/news`, { withCredentials: true });
    }
};

export default MilestonesService;
