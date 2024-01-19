import PropTypes from 'prop-types';
import { useState } from 'react';

const LogIn = ({login}) => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
    return (
    <div>
        <form onSubmit={login}>
          <div>
            <label htmlFor='username'>Username</label>
            <input type="text" name="usename" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <button>Log In</button>
        </div>
        </form>
    </div>
  )
}

LogIn.protoTypes = {
    login: PropTypes.func
}

export default LogIn