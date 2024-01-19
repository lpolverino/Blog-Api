import PropTypes from 'prop-types';

const Post = ({post}) => {
  return (
    <div>{post.title}</div>
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