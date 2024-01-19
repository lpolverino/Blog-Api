import PropTypes from 'prop-types';
import { useState } from 'react';

import Comment from '../Comment/Comment';

const Post = ({post, togglePublishedHandler, editCommentHandler, deleteCommentHandler}) => {
  
  const [activeComments, setActiveComments] = useState(false)

  const showComments = () =>{
    return (
      <div>
          <ul>
              {post.comments.map(comment => <li key={comment._id}> <Comment comment ={comment}></Comment></li>)}
          </ul>
      </div>
    )
  }
  
  const toglePublsihed = (e) => {
    e.preventDefault();
    const publishedValue = post.published === "Published" ? "Unpublished":"Published"
    togglePublishedHandler(post._id, publishedValue)
  } 

  return (
    <div>
      <h2>{post.title} ({post.published})</h2>
      <p>by: {post.author} posted: {post.date ? (new Date(post.date)).toLocaleString():"N/A"}</p>
      <p>{post.content}</p>
      <div>  
        <button onClick={()=> setActiveComments(!activeComments)}>See comments</button>
        <button onClick={(event) => toglePublsihed(event)}> {post.published === "Published" ? "unpublished":"publish"}</button>
      </div>
      {activeComments && showComments()}
    </div>
  )
}

Post.propTypes = {
    post: PropTypes.shape({
        title:PropTypes.string,
        content:PropTypes.string,
        author:PropTypes.string,
        date:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Date)
        ]),
        comments: PropTypes.array,
        published: PropTypes.string
    }),
    togglePublishedHandler:PropTypes.func,
    editCommentHandler:PropTypes.func, 
    deleteCommentHandler:PropTypes.func,
}

export default Post