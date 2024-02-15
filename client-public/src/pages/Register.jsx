import { useNavigate } from 'react-router-dom';
import axios from '../configs/instance'
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';
import { useState } from 'react';




export default function Register() {

  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  function onSubmitRegister(e) {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())

    // TODO: axios register then success card/alert, then redirect to login
    register(formJson)
    e.target.reset()
    // navigate("/login")
  }

  async function register(json) {
    try {
      console.log(json)
      const { data } = await axios.post('/register', json)
      if (data) {
        console.log(data)
        // TODO: showSuccess
        setSuccess(true)
      }
    } catch (error) {
      console.log(error);
      // TODO: showError
      setError(true)
    }
  }

  return (
    <>
      <div className='m-3'>
        {success ? <SuccessMessage /> : null}
        {error ? <ErrorMessage /> : null}
      </div>
      <form className="m-3" onSubmit={onSubmitRegister}>
        {/* fullName */}
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>

        {/* Register Button */}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </>
  )
}
