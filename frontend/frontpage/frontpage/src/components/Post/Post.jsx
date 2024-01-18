import React from 'react'

const Post = ({post}) => {
  return (
    <div>
        <h2>{post.title}</h2>
        <p> by : {post.author}</p>
        <p>{post.date}</p>
        <p>{post.content}</p>
        <button>Comments</button>
    </div>
  )
}

export default Post