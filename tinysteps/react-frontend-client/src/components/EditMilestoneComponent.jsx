import { useState, useEffect } from 'react';
import MilestonesService from '../MilestonesService';
import '../index.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditMilestoneComponent = () => {
  const { id } = useParams();
  const [milestoneName, setMilestoneName] = useState('');
  const [kidName, setKidName] = useState('');
  const [milestoneDate, setMilestoneDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load the existing milestone data when the page loads
  useEffect(() => {
    document.title = 'Edit Milestone - TinySteps';
    MilestonesService.getMilestoneById(id).then((res) => {
      const m = res.data;
      setMilestoneName(m.milestone_name);
      setKidName(m.kid_name);
      // Format date to YYYY-MM-DD for the date input
      const dateObj = new Date(m.milestone_date);
      const formatted = dateObj.toISOString().split('T')[0];
      setMilestoneDate(formatted);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setError("Couldn't load the milestone.");
      setLoading(false);
    });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const updatedMilestone = {
      milestone_name: milestoneName,
      kid_name: kidName,
      milestone_date: milestoneDate
    };

    MilestonesService.updateMilestone(id, updatedMilestone).then(() => {
      navigate('/milestones');
    }).catch((err) => {
      console.error(err);
      setError("Couldn't save changes, please try again.");
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="form-page">
      <h2 className="page-title">Edit Milestone ✏️</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="milestone-form">
        <div className="form-group">
          <label htmlFor="milestoneName">Milestone Name:</label>
          <input
            id="milestoneName"
            type="text"
            className="form-input"
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
          <button type="submit" className="btn-primary">Save Changes</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/milestones')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMilestoneComponent;
