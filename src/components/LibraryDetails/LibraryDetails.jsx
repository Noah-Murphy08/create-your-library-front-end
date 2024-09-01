import { Link, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { AuthedUserContext } from "../../App"
import * as libraryService from '../../services/libraryService'
import styles from './LibraryDetails.module.css'

const libraryDetails = new URL('../images/LibraryDetails.jpg', import.meta.url)


const LibraryDetails = (props) => {
    const [library, setLibrary] = useState(null)

    const { libraryId } = useParams()

    const user = useContext(AuthedUserContext)

    useEffect(() => {
        const fetchLibrary = async () => {
            const libraryData = await libraryService.show(libraryId)
            setLibrary(libraryData)
        }
        fetchLibrary()
    }, [libraryId])

    if (!library) return <main>Loading...</main>

    const filterbooks = props.books.filter(book =>
        library.books.includes(book._id)
    )

    const eachGenre = filterbooks.reduce((accumulator, book) => {
        if (!accumulator[book.genre]) {
            accumulator[book.genre] = []
        }
        accumulator[book.genre].push(book)
        return accumulator
    }, {})

    return (
        <>
            <div className={styles.libDetCont}>
                <main className={styles.libDet}>
                    <header className={styles.libHead}>
                        <h1>{library.name}</h1>
                        <h2>Located in {library.location}</h2>
                        <p>owned by {library.owner.username}</p>
                    </header>
                    {library.owner._id === user._id && (
                        <div className={styles.btns}>
                            <Link className={styles.libDetLinkEdit} to={`/libraries/${libraryId}/edit`}>Edit Library</Link>
                            <button onClick={() => props.handleDeleteLibrary(libraryId)} className={styles.libDetDel}>Delete Library</button>
                        </div>
                    )}
                    <section>
                        <h2>Books:</h2>
                        {!library.books.length && <p>There are no books in this library.</p>}
                        {Object.keys(eachGenre).map((genre) => (
                            <div key={genre} className={styles.genreSec}>
                                <h2 className={styles.genreHead}>{genre}</h2>
                                <ul className={styles.libDetBooks}>
                                    {eachGenre[genre].map((book) => (

                                        <Link className={styles.libDetLink} key={book._id} to={`/books/${book._id}`}>
                                            <li className={styles.libDetBookItem} key={book._id}>{book.title} written by {book.author}</li>
                                        </Link>

                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                </main>
                <div className={styles.imgCont}>
                    <img src={libraryDetails} alt="Library Enterance" className={styles.libDetImg} />
                </div>
            </div>
        </>
    )
}


export default LibraryDetails