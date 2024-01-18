import { useState } from 'react'
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment'
import styles from "./post.module.css"


const Post = ({post, handleSubmit}) => {

    const [activeComments, setActiveComments] = useState(false)
    const [isCommenting, setIsCommenting] = useState(false)
    const [commentAuthor, setCommentAuthor] = useState('')
    const [commentContent, setCommentContent] = useState('')

    const postComment = async (e) =>{
        e.preventDefault()
        const comment = {author: commentAuthor, content: commentContent}

        setIsCommenting(true)

        try{
            await handleSubmit(post._id, comment)
        }catch(error)
        {
            console.log(`error posting the comment ${error}`);
        }
        finally{
            setIsCommenting(false)
        }
    }

    const showComments = () =>{
        return (
            <div className={styles.comments}>
                <ul>
                    {post.comments.map(comment => <li key={comment._id}> <Comment comment ={comment}></Comment></li>)}
                </ul>
                <form onSubmit={(e) => postComment(e)} className={styles.form}>
                    <div className={styles.author}>
                        <label>By:</label>
                        <input type='text' required placeholder='Anonymus' value={commentAuthor} onChange={(e) =>setCommentAuthor(e.target.value)}></input>
                    </div>

                    <div className={styles.content}>
                        <input type='text'required placeholder='great Post!' value={commentContent} onChange={(e) =>setCommentContent(e.target.value)}></input>
                    </div><div className={styles.send}>
                        
                        {!isCommenting && <button>Comment</button>}
                        {isCommenting && <button disabled>Commenting...</button>}
                    </div>
                </form>
            </div>
        )
    }

    const postDate = (new Date(post.date)).toLocaleString()

  return (
    <div className={styles.post}>
        <h2>{post.title}</h2>
        <p> by : {post.author}</p>
        {post.date && <p>posted {postDate}</p>}
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
    }),
    handleSubmit: PropTypes.func
}

export default Post