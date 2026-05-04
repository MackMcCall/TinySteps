import { useLocation } from 'react-router-dom';

function LoginPage() {
  const location = useLocation();

  // Get the path the user was trying to access
  const from = location.state?.from?.pathname || '/';
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Send the 'from' path so the backend can redirect back after login
  const googleLoginUrl = BACKEND_URL + '/auth/google?returnTo=' + from;

  return (
    <div className="login-page">
      <div style={{ fontSize: '4rem', marginBottom: '16px' }}>👣</div>
      <h2>Welcome to TinySteps</h2>
      <p>Sign in to start tracking your baby's milestones!</p>

      {/* Using a regular <a> tag here because we need to leave the React app
          and go to the backend/Google for OAuth */}
      <a href={googleLoginUrl} className="google-login-btn">
        🔑 Login with Google
      </a>
    </div>
  );
}

export default LoginPage;
