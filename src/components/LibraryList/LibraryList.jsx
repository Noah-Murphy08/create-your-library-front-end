import { Link } from "react-router-dom"
import styles from './LibraryList.module.css'

const libraryList = new URL('../images/LibraryLi.jpg', import.meta.url)


const LibraryList = (props) => {

    return (
        <>
            <div className={styles.libListCont}>
                <main className={styles.libList}>
                    {props.libraries.map((library) => (
                        <Link key={library._id} to={`/libraries/${library._id}`} className={styles.libListLink}>
                            <h2 className={styles.libName}>
                                {library.name}
                            </h2>
                        </Link>
                    ))}
                </main>
                <div className={styles.imgCont}>
                    <img src={libraryList} alt="Library Enterance" className={styles.libListImg} />
                </div>
            </div>
        </>
    )
}


export default LibraryList