import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../App';
import './sagLogin.scss';

const SAGLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await axios.post('http://localhost:3001/sag-login', { email, password });
      
      console.log("API Response:", result.data); // Log the entire response

      if (result.data.status === "SUCCESS") { // Assuming API response has a status field
        // Extract user data from result if available
        const user = result.data.user || { name: 'SAG User' }; // Replace with actual user data if available
        
        // Dispatch LOGIN_SAG action
        dispatch({ type: 'LOGIN_SAG', payload: { user } });

        navigate('/sag-dashboard'); // Redirect to SAG dashboard
      } else {
        setError(result.data.message || 'Login failed. Please check your credentials.'); // Set specific error message
      }
    } catch (err) {
      console.error("Error occurred:", err); // Log error details
      setError('An error occurred. Please try again.'); // Set generic error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='sag-login'>
      <div className="card">
        <div className="left">
          <h1>SAG Login</h1>
          <p>
            Welcome to the SAG Login page. Please enter your credentials to access the SAG Dashboard.
            If you do not have an account, please contact support.
          </p>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className='error'>{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SAGLogin;
