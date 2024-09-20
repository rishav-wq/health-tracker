import { useState } from 'react';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSAG, setIsSAG] = useState(false); // Checkbox state for SAG
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { name, email, password, isSAG })
      .then(result => {
        console.log(result);
        navigate('/login'); // Redirect to login page after successful registration
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='register'>
      <div className="card">
        <div className="left">
          <h1 style={{ color: "white" }}>Welcome to Health Tracking App</h1>
          <p>
            Join our Health Tracking App to effortlessly monitor your daily health metrics, including body temperature, blood pressure, and heart rate. Take control of your health and wellness journey today!
          </p>
          <span>Already registered?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder='Create Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>
              <input
                type="checkbox"
                checked={isSAG}
                onChange={(e) => setIsSAG(e.target.checked)}
              />
              Sign me up as a SAG User
            </label>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
