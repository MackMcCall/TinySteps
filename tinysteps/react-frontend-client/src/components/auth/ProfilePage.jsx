import React from 'react';
import { useAuth } from './AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 className="page-title">Your Profile 👤</h2>

      <div style={{
        background: 'white',
        border: '1px solid #e9d5ff',
        borderRadius: '12px',
        padding: '28px',
        boxShadow: '0 2px 10px rgba(167,139,250,0.1)'
      }}>
        <h3 style={{ color: '#4c1d95', marginTop: 0 }}>
          Welcome back, {user.displayname}! 👋
        </h3>

        <div style={{ lineHeight: '1.8', marginBottom: '20px' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong style={{ color: '#6d28d9' }}>Email:</strong> {user.email}
          </p>
          {user.googleid && (
            <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>
              Google ID: {user.googleid}
            </p>
          )}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #f3e8ff', margin: '20px 0' }} />

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/milestones" className="btn-primary">
            View Milestones
          </Link>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Debugging info, collapsed by default */}
      <details style={{ marginTop: '24px', opacity: '0.6', fontSize: '0.85rem' }}>
        <summary style={{ cursor: 'pointer', color: '#888' }}>Raw User Data (debugging)</summary>
        <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px', overflowX: 'auto', marginTop: '8px' }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </details>
    </div>
  );
}

export default ProfilePage;
