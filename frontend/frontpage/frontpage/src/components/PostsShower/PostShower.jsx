import { useEffect, useState } from "react"
import Post from "../Post/Post"
import styles from "./post-shower.module.css"

const PostShower = ({publicBackend}) => {

  const [posts , setPosts ] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] =useState(null) 
  
  useEffect( () =>{
    const getPost = async () => {
      try{
        const response = await fetch( publicBackend )

        if (!response.ok){
          throw new Error(
            `Http error from public backend : ${response.status}`
          )
        }
        const data = await response.json()
        setPosts(data)
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
  },[])

  return (
    <div className={styles.posts}>
      {isLoading && <div className={styles.loading}>Loading Posts... </div>}
      {error && (
        <div className={styles.error}>{`There is a problem fetching the posts data - ${error}`}</div>
      )}
      {posts && posts.map(post => <Post key ={post._id} post={post}></Post>) }
    </div>
  )
}

export default PostShower