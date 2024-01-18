import { useEffect, useState } from "react"
import PropTypes from 'prop-types';

import Post from "../Post/Post"
import styles from "./post-shower.module.css"

const PostShower = ({publicBackend}) => {

  const [posts , setPosts ] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] =useState(null) 

  const handleSubmit = async (id, comment) =>{

    let newComment 

    try{
        const response = await fetch(publicBackend + "/"+id+"/comments",{
            method:'POST',
            headers:{"Content-type":"Application/json"},
            body:JSON.stringify(comment)
        })

        if(!response.ok){
            throw new Error
        }
         newComment = await response.json()
        
        //add comment to the post
    }catch(error)
    {
        console.log(`error posting the comment ${error}`);
    }
    const newPosts = posts.map(post => {
      if(post._id !== id) return post
      const newPost = post
      newPost.comments = [...post.comments, newComment??newComment]
      return newPost
    })
    setPosts(newPosts)

}
  
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
  },[publicBackend])

  return (
    <div className={styles.posts}>
      {isLoading && <div className={styles.loading}>Loading Posts... </div>}
      {error && (
        <div className={styles.error}>{`There is a problem fetching the posts data - ${error}`}</div>
      )}
      {posts && posts.map(post => <Post key ={post._id} post={post} handleSubmit = {handleSubmit}></Post>) }
    </div>
  )
}

PostShower.propTypes ={
  publicBackend: PropTypes.string.isRequired
}

export default PostShower