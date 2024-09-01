import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import styles from './Dashboard.module.css'

const libraryEntrance = new URL('../images/Main entrance.jpg', import.meta.url)


const Dashboard = ({ }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboard}>
          <h1 className={styles.welcome}>Welcome, {user.username}</h1>
          <p className={styles.welcomeMessage}>
            Use the navagation bar on the top left hand side of your screen
            to move through the app.
          </p>
        </div>
        <div className={styles.image}>
          <img src={libraryEntrance} alt="Library Enterance" className={styles.dashboardImg} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
