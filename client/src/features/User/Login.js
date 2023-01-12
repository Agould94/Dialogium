import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { login } from './userSlice'

function Login({ setUser }) {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  //const history = useHistory()
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          dispatch(login(user))
        //history.push('/')
      });
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="loginFirstName"
          autoComplete="off"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="loginPassword"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
