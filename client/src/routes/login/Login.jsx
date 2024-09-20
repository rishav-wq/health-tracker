import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.scss';
import { UserContext } from '../../App';

const Login = () => {
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await axios.post('http://localhost:3001/login', { email, password });
      console.log('Result Data:', result.data); // Debugging response

      // Check if login is successful by looking for a success message
      if (result.data && result.data.message === "Login successful") {
        console.log("Login successful, navigating to home...");
        dispatch({ type: "LOGIN_NORMAL", payload: { user: { email } } });
        navigate('/'); // Redirect to home page
      } else {
        // Handle error message
        if (typeof result.data === 'object' && result.data !== null && 'message' in result.data) {
          setError(result.data.message);
        } else {
          setError('Login failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Login error:', err); // Log error for debugging
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSAGLogin = () => {
    navigate('/sag-login');
  };

  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1 style={{ color: "white" }}>Health Tracking App</h1>
          <p>
            Welcome to the Health Tracking App, your personal hub for monitoring and managing your health metrics. Log in to access your health records, track your progress, and stay informed about your health. We're here to support your wellness journey!
          </p>
          <span>New here?</span>
          <Link to="/register">
            <button>Register Now</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login to Your Account</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder='Enter your email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className='error'>{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <button onClick={handleSAGLogin} className='sag-button'>SAG User Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
