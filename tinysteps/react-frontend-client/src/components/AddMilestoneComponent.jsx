import { useState, useEffect } from 'react';
import MilestonesService from '../MilestonesService';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const AddMilestoneComponent = () => {
  const [milestoneName, setMilestoneName] = useState('');
  const [kidName, setKidName] = useState('');
  const [milestoneDate, setMilestoneDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Add Milestone - TinySteps';
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const newMilestone = {
      milestone_name: milestoneName,
      kid_name: kidName,
      milestone_date: milestoneDate
    };

    MilestonesService.createMilestone(newMilestone).then(() => {
      navigate('/milestones');
    }).catch((err) => {
      console.error(err);
      setError("Something went wrong, couldn't save the milestone.");
    });
  }

  return (
    <div className="form-page">
      <h2 className="page-title">Add a New Milestone 🎉</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="milestone-form">
        <div className="form-group">
          <label htmlFor="milestoneName">Milestone Name:</label>
          <input
            id="milestoneName"
            type="text"
            className="form-input"
            placeholder="e.g. First steps!"
            value={milestoneName}
            onChange={(e) => setMilestoneName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="kidName">Kid's Name:</label>
          <input
            id="kidName"
            type="text"
            className="form-input"
            placeholder="e.g. Emma"
            value={kidName}
            onChange={(e) => setKidName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="milestoneDate">Date:</label>
          <input
            id="milestoneDate"
            type="date"
            className="form-input"
            value={milestoneDate}
            onChange={(e) => setMilestoneDate(e.target.value)}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">Save Milestone</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/milestones')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMilestoneComponent;
