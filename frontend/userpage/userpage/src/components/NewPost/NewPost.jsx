import { useState } from "react"
import PropTypes from 'prop-types';


const NewPost = ({addPost}) => {
  const [addingPost, setAddingPost] = useState(false)
  const [isSUbmiting, setIsSubmiting] = useState(false)
  const [newPost, setNewPost] = useState({
    title:'',
    content:'',
    author:'',
    published: false
  })

  const suubmitPost = async (e,newPost) =>{
    e.preventDefault()
    setIsSubmiting(true)
    try{
      await addPost(newPost)
      setNewPost({
        title:'',
        content:'',
        author:'',
        published: false
      })
    }
    catch (error){
      console.log(`Error submiting the post ${error}`);
    }
    finally{
      setIsSubmiting(false)
    }
  }

  const createForm = () =>{
    return (
      <form onSubmit={(e) => suubmitPost(e,newPost)}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" value={newPost.title} onChange={ (e) =>setNewPost({...newPost,title: e.target.value})}/>
        <label htmlFor="author">Author</label>
        <input type="text" name="author" id="author" value={newPost.author} onChange={ (e) =>setNewPost({...newPost,author: e.target.value})}/>
        <label htmlFor="content">Content</label>
        <input type="text" name="content" id="content" value={newPost.content} onChange={ (e) =>setNewPost({...newPost,content: e.target.value})}/>
        <label htmlFor="date">Date</label>
        <label htmlFor="published"> Publish?</label>
        <input type="checkbox" name="publish" id="publis" value={newPost.published} onChange={(e) => setNewPost({...newPost, published:e.target.checked})}/>
        <div>
          {!isSUbmiting 
          ?<button>Add!</button>
          :<button disabled>Add!</button> }
          
        </div>
      </form>
    )
  }

  return (
    <div>
      {addingPost
        ? createForm()
        : <button onClick={() => setAddingPost(!addingPost)}> New Post</button>
      }
    </div>
    
  )
}

NewPost.propTypes = {
  addPost: PropTypes.func
}

export default NewPost