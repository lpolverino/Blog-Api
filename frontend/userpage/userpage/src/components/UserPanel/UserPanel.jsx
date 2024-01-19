import PropTypes from 'prop-types';
import { useEffect, useState } from "react"

import Post from "../Post/Post"
import NewPost from '../NewPost/NewPost';

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

  const togglePublished = async (id, newValue) =>{
    
    try{
      const response = await fetch(backendUrl +'/posts/'+id,{
        method:'PUT',
        headers:{Authorization: 'Bearer '+sessionStorage.token,"Content-type":"Application/json"},
        body:JSON.stringify({published:newValue})
      })
      if(!response.ok){
        if(response.status === 401) throw new Error("Invalid Credentials")
        setError(`Server respond with status: ${response.status}`)
        return
      }

    const newPosts = posts.map(post => {
      if(post._id !== id) return post
      const newPost = post
      newPost.published = newValue
      return newPost
    })
    setPosts(newPosts)
    }catch (error){
      setError(`there was an error updating the post${error}`)
    }
  }

  const addnewPost = async (newPost) =>{
    const post = {
      ...newPost,
      date: new Date(),
      published: newPost.published ? "Published" : "Unpublished"
    }
    try{
      const response = await fetch(backendUrl +'/posts/',{
        method:'POST',
        headers:{Authorization: 'Bearer '+sessionStorage.token,"Content-type":"Application/json"},
        body:JSON.stringify(post)
      })
      if(!response.ok){
        if(response.status === 401) throw new Error("Invalid Credentials")
        setError(`Server respond with status: ${response.status}`)
        return
      }
      const addedPost = await response.json()
      const newPosts = posts.concat([addedPost])
      setPosts(newPosts)
    }
    catch(error){
      setError(`there was an error adding the post${error}`)
    }
  }

  const deleteComment = async (postId, commentId) =>{
    try{
      const response = await fetch(backendUrl + '/posts/' + postId + "/comments/" + commentId,{
        method:'DELETE',
        headers:{Authorization: 'Bearer '+sessionStorage.token,"Content-type":"Application/json"},
      })
      if(!response.ok){
        if(response.status === 401) throw new Error("Invalid Credentials")
        setError(`Server respond with status: ${response.status}`)
        return
      }
      const newPosts = posts.map(post => {
        if(post._id !== postId) return post
        const updatedPost = {...post,
        comments: post.comments.filter(comment => comment._id !== commentId)}
        return updatedPost
      })
      setPosts(newPosts)
    }catch (error){
      setError(`there was an error deleting the comment${error}`)
    }
  }

  const editComment = async (postId, commetId, newContent, newAuthor) => {

  }

  return (
    <div>
      {isLoading && <div >Loading Posts... </div>}
      {error && (
        <div>{`There is a problem fetching the posts data - ${error}`}</div>
      )}
      <NewPost addPost={addnewPost}></NewPost>
      {posts &&
        posts.map(post =>
          <Post key ={post._id}
            post={post}
            togglePublishedHandler={togglePublished}
            deleteCommentHandler={deleteComment} 
            editCommentHandler={editComment}>
          </Post>
        ) 
      }
    </div>
  )
}

UserPanel.propTypes = {
  backendUrl: PropTypes.string.isRequired
}

export default UserPanel