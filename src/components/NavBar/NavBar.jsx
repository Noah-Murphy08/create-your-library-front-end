import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext, useState } from 'react';
import styles from './NavBar.module.css'

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {user ? (
        <div className={styles.sidebarContainer}>
          <button className={styles.toggle} onClick={toggleSidebar}>|||</button>
          <nav className={`${styles.sidebar} ${isOpen ? styles.openSidebar : ''}`}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/books">Book List</Link>
              </li>
              <li>
                <Link to="/books/new">New Book</Link>
              </li>
              <li>
                <Link to="/libraries">Library List</Link>
              </li>
              <li>
                <Link to="/libraries/new">Build Library</Link>
              </li>
              <li>
                <Link to="" onClick={handleSignout}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className={styles.sidebarContainer}>
          <button className={styles.toggle} onClick={toggleSidebar}>|||</button>
          <nav className={`${styles.sidebar} ${isOpen ? styles.openSidebar : ''}`}>
            <ul>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
export default NavBar;
