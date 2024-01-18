import styles from "./header.module.css"

const Header = () => {
  return (
    <div className={styles.header}>
        <h1>Blog</h1>
        <a href="#">Log In</a>
    </div>
  )
}

export default Header