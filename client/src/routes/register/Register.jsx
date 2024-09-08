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

  axios.defaults.withCredentials=true;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://scholar-ship-api.vercel.app/register', { name, email, password, isSAG })
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
          <h1 style={{ color: "white" }}>PMSS Scholarship Portal</h1>
          <p>
            Welcome to the PMSS Scholarship Portal! Here, you can easily register for a seamless scholarship application process. Join us and access various opportunities designed to support your educational journey.
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Username'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder='Email'
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
            <label>
              <input
                type="checkbox"
                checked={isSAG}
                onChange={(e) => setIsSAG(e.target.checked)}
              />
              SAG User
            </label>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
