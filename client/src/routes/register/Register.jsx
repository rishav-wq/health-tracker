import { useState } from 'react'
import './register.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/register', { name, email, password })
      .then(result => {
        console.log(result)
        navigate('/login')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='register'>
      <div className="card">
        <div className="left">
          <h1 style={{color: "white"}}>PMSS Scholarship Portal</h1>
          <p> Welcome to the PMSS Scholarship Portal! Here, you can easily register for a seamless scholarship application process. Join us and access various opportunities designed to support your educational journey.</p>
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
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              type="email" 
              placeholder='Email' 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder='Password' 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
