import { useState } from 'react'
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment'


const Post = ({post}) => {

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

  return (
    <div>
        <h2>{post.title}</h2>
        <p> by : {post.author}</p>
        {post.date && <p>{post.date}</p>}
        <p>{post.content}</p>
        <button onClick={ () => setActiveComments(!activeComments)}>Comments</button>
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
    })
}

export default Post