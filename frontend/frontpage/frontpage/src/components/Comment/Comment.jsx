import PropTypes from 'prop-types';


const Comment = ({comment}) => {
  return (
    <div>
        <p>{comment.content}</p>
        <p>{comment.author}</p>
    </div>
  )
}

Comment.propTypes = {
    comment: PropTypes.shape({
        content:PropTypes.string,
        author:PropTypes.string
    })
}

export default Comment