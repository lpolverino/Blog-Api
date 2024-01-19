import PropTypes from 'prop-types';
import { useState } from 'react';

const Comment = ({comment, editComment, deleteComment}) => {

    const [isEditing, setIsEditing ] = useState(false)
    const [editedContent, setEditedContent] = useState('')
    const [editedAuthor, setEditedAuthor] = useState('')
    return (
    <div>
        { isEditing
        ?<input type='text' name='content' id='contetn' value={editedContent} onChange={(e) => setEditedContent(e.target.value)}></input> 
        :<p>{comment.content}</p>}
        { isEditing
        ?<input type='text' name='author' id='author' value={editedAuthor} onChange={(e) => setEditedAuthor(e.target.value)}></input>
        :<p>{comment.author}</p>}
        <div>
            <button onClick={(e) =>{
                e.preventDefault()
                if(isEditing){
                    editComment(comment._id, editComment, editedAuthor)
                }
                setIsEditing(!isEditing)
            }}> Edit</button>
            <button onClick={(e) => { e.preventDefault();deleteComment(comment._id)}}>Delete</button>
        </div>
    </div>
  )
}

Comment.propTypes = {
    comment: PropTypes.shape({
        content:PropTypes.string,
        author:PropTypes.string
    }),
    editComment:PropTypes.func,
    deleteComment: PropTypes.func
}

export default Comment