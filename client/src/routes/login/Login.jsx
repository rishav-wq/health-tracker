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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await axios.post('https://scholar-ship-api.vercel.app/login', { email, password });

      if (result.data === "SUCCESS!!!") {
        dispatch({ type: "LOGIN_NORMAL", payload: { user: { email } } }); // Adjust as necessary
        navigate('/'); // Redirect to home page
      } else {
        setError(result.data); // Show error message
      }
    } catch (err) {
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
          <h1 style={{ color: "white" }}>PMSS Scholarship Portal</h1>
          <p>
            Welcome to the PMSS Scholarship Portal, your gateway to a seamless and paperless scholarship application process. Log in to manage your scholarship information, view application status, and stay updated on all important notifications. Our goal is to help you succeed by making the scholarship application process as simple as possible.
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login to PMSS</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder='Enter your email'
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
          <button onClick={handleSAGLogin} className='sag-button'>SAG Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
