import { useState } from "react"

import UserPanel from "../UserPanel/UserPanel"
import LogIn from "../LogIn/LogIn"

function App() {

  const [logIn, setLogIn] = useState(false)
  

  const sendLogIn = () =>{}

  return (
    <div >
      {logIn ? <UserPanel></UserPanel> :<LogIn login={sendLogIn}></LogIn>}
    </div>
  )
}

export default App