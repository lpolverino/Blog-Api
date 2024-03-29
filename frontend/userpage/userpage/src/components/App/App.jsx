import { useState } from "react"

import UserPanel from "../UserPanel/UserPanel"
import LogIn from "../LogIn/LogIn"


const  userUrl = 'http://localhost:3000/user'
const   loginUrl = 'http://localhost:3000/user/log-in'


function App() {

  const [error, setError] = useState(null)

  const sendLogIn = async (event, username, password) =>{
    event.preventDefault()
    try{
      const response = await fetch(loginUrl,{
        method:'POST',
        headers:{"Content-type":"Application/json"},
        body:JSON.stringify({username, password})
      })
      if(!response.ok){
        if(response.status === 401) throw new Error("Invalid Credentials")
        setError(`Server respond with status: ${response.status}`)
        return
      }
      const tokenData = await response.json()
      sessionStorage.setItem('token', tokenData.token);
      setError(null)
      }
    catch (error){
      setError(`there was an error handling the request ${error}`)
    }
  }

  return (
    <div >
      {error && <div> {error}</div>}
      {sessionStorage.token !== null
        ?<UserPanel backendUrl = {userUrl}></UserPanel>
        :<LogIn login={sendLogIn}></LogIn>}
    </div>
  )
}

export default App