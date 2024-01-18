
import Header from '../Header/Header'
import PostShower from '../PostsShower/PostShower'
import styles from './app.module.css'

const publicBackEnd = 'http://localhost:3000/blog/posts'

function App() {

  return (
    <div className={styles.app}>
      <Header></Header>
      <PostShower publicBackend={publicBackEnd}></PostShower>
    </div>
  )
}

export default App
