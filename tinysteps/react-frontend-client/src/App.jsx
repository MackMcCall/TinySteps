import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import MilestoneListComponent from './components/MilestoneListComponent';
import AddMilestoneComponent from './components/AddMilestoneComponent';
import EditMilestoneComponent from './components/EditMilestoneComponent';
import BabyNewsComponent from './components/BabyNewsComponent';
import LoginPage from './components/auth/LoginComponent';
import ProtectedLayout from './components/auth/ProtectedLayout.jsx';
import ProfilePage from './components/auth/ProfilePage.jsx';
import { AuthProvider } from './components/auth/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          <header className="app-header">
            <div className="header-content">
              <h1 className="app-title">👣 TinySteps</h1>
              <p className="app-subtitle">Baby Milestone Tracker</p>
            </div>
            <nav className="app-nav">
              <Link to="/milestones">Milestones</Link>
              <Link to="/news">Baby News</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/login">Login</Link>
            </nav>
          </header>

          <main className="app-main">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedLayout />}>
                <Route path="/" element={<MilestoneListComponent />} />
                <Route path="/milestones" element={<MilestoneListComponent />} />
                <Route path="/milestones/kid/:kidName" element={<MilestoneListComponent />} />
                <Route path="/milestones/:id/edit" element={<EditMilestoneComponent />} />
                <Route path="/add-milestone" element={<AddMilestoneComponent />} />
                <Route path="/news" element={<BabyNewsComponent />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>

          <footer className="app-footer">
            <p>Made with ❤️ for tracking every tiny moment</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
