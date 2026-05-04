import React, { useState, useEffect } from 'react';
import MilestonesService from '../MilestonesService';
import '../index.css';
import { Link, useParams } from 'react-router-dom';

const MilestoneListComponent = () => {
  const { kidName } = useParams();
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (kidName) {
      MilestonesService.getMilestonesByKid(kidName).then((res) => {
        setMilestones(res.data);
        document.title = `${kidName}'s Milestones - TinySteps`;
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        setError("Couldn't load milestones.");
        setLoading(false);
      });
    } else {
      MilestonesService.getMilestones().then((res) => {
        setMilestones(res.data);
        document.title = 'All Milestones - TinySteps';
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        setError("Couldn't load milestones.");
        setLoading(false);
      });
    }
  }, [kidName]);

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this milestone?")) {
      MilestonesService.deleteMilestone(id).then(() => {
        setMilestones(milestones.filter(m => m.id !== id));
      }).catch((err) => {
        console.error(err);
        alert("Something went wrong deleting the milestone.");
      });
    }
  }

  // Format date nicely
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  if (loading) {
    return <p>Loading milestones...</p>;
  }

  if (error) {
    return <p className="error-msg">{error}</p>;
  }

  return (
    <div>
      <h2 className="page-title">
        {kidName ? `${kidName}'s Milestones 👶` : 'All Milestones 🌟'}
      </h2>

      {kidName && (
        <Link to="/milestones" className="back-link">← All Milestones</Link>
      )}

      <div className="top-actions">
        <Link to="/add-milestone" className="btn-primary">+ Add Milestone</Link>
      </div>

      {milestones.length === 0 ? (
        <p className="empty-msg">No milestones yet! Add the first one. 🎉</p>
      ) : (
        <>
          <div className="milestone-cards">
            {milestones.map(milestone => (
              <div className="milestone-card" key={milestone.id}>
                <div className="milestone-emoji">🏆</div>
                <div className="milestone-info">
                  <h3>{milestone.milestone_name}</h3>
                  <p className="kid-name">👶 {milestone.kid_name}</p>
                  <p className="milestone-date">📅 {formatDate(milestone.milestone_date)}</p>
                </div>
                <div className="milestone-actions">
                  <Link to={`/milestones/${milestone.id}/edit`} className="btn-edit">Edit</Link>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(milestone.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="table-heading">Milestones Table</h3>
          <div className="table-wrapper">
            <table className="milestones-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Milestone</th>
                  <th>Kid</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map(milestone => (
                  <tr key={milestone.id}>
                    <td>{milestone.id}</td>
                    <td>{milestone.milestone_name}</td>
                    <td>
                      <Link to={`/milestones/kid/${milestone.kid_name}`} className="kid-link">
                        {milestone.kid_name}
                      </Link>
                    </td>
                    <td>{formatDate(milestone.milestone_date)}</td>
                    <td>
                      <Link to={`/milestones/${milestone.id}/edit`} className="btn-edit-sm">Edit</Link>
                      <button
                        className="btn-delete-sm"
                        onClick={() => handleDelete(milestone.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MilestoneListComponent;
