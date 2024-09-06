import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './login.scss'
import { UserContext } from '../../App'

const Login = () => {

  const {state,dispatch} = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log(result)
        if(result.data === "SUCCESS!!!"){
          dispatch({type: "USER",payload: true})
          navigate('/') // Redirect to home page
        } else {
          alert(result.data) // Show error message
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1 style={{color: "white"}}>PMSS Scholarship Portal</h1>
          <p>Welcome to the PMSS Scholarship Portal, your gateway to a seamless and paperless scholarship application process. Log in to manage your scholarship information, view application status, and stay updated on all important notifications. Our goal is to help you succeed by making the scholarship application process as simple as possible.</p>
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
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
