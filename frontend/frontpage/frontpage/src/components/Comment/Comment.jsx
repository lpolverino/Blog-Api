import PropTypes from 'prop-types';
import styles from "./comment.module.css"

const Comment = ({comment}) => {
  return (
    <div className={styles.comment}>
        <p>{comment.content}</p>
        <p className={styles.author}>{comment.author}</p>
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