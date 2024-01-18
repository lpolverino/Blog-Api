
import Header from '../Header/Header'
import PostShower from '../PostsShower/PostShower'
import styles from './app.module.css'

const publicBackEnd = 'http://localhost:3000/blog/posts'

function App() {

  return (
    <div className={styles.app}>
      <Header></Header>
      <div className={styles.main}>
        <PostShower publicBackend={publicBackEnd}></PostShower>
        <footer>
          <p>created by: <a href='https://github.com/lpolverino'> @lpolverino</a> </p>
          <a href='https://github.com/lpolverino/Blog-Api'>See Code</a>
        </footer>
      </div>
    </div>
  )
}

export default App
