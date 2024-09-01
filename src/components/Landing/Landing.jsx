import styles from './Landing.module.css'

const libraryEntrance = new URL('../images/Landing.png', import.meta.url)

const Landing = () => {
  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboard}>
          <h1>Welcome, Guest!</h1>
          <h3>
            Sign in to start creating your own personal library!
            If you dont have an account, sign up first!
          </h3>
        </div>
        <div className={styles.image}>
          <img src={libraryEntrance} alt="Library Enterance" className={styles.dashboardImg} />
        </div>
      </div>
    </>
  );
};

export default Landing;
