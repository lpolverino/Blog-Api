import PropTypes from 'prop-types';
import { useEffect, useState } from "react"

import Post from "../Post/Post"

const UserPanel = ({backendUrl}) => {
  const [posts , setPosts ] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] =useState(null) 

  useEffect( () =>{
    const getPost = async () => {
      try{
        const response = await fetch( backendUrl + "/posts",{
          headers: {Authorization: 'Bearer '+sessionStorage.token
        }} )

        if (!response.ok){
          throw new Error(
            `Http error from public backend : ${response.status}`
          )
        }
        const data = await response.json()
        console.log(data);
        setPosts(data.posts)
        setError(null)
      }
      catch (error){
        setError(error)
        setPosts(null)
      } 
      finally{
        setIsLoading(false)
      }
    }

    getPost()
  },[backendUrl])


  return (
    <div>
      {isLoading && <div >Loading Posts... </div>}
      {error && (
        <div>{`There is a problem fetching the posts data - ${error}`}</div>
      )}
      {posts && posts.map(post => <Post key ={post._id} post={post} ></Post>) }
    </div>
  )
}

UserPanel.propTypes = {
  backendUrl: PropTypes.string.isRequired
}

export default UserPanel