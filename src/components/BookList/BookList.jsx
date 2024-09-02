import { Link } from "react-router-dom"
import styles from './BookList.module.css'

const bookList = new URL('../images/BookList.jpg', import.meta.url)


const BookList = (props) => {
    const eachGenre = props.books.reduce((accumulator, book) => {
        if (!accumulator[book.genre]) {
            accumulator[book.genre] = []
        }
        accumulator[book.genre].push(book)
        return accumulator
    }, {})

    return (
        <>
            <div className={styles.bookListCont}>
                <main className={styles.bookList}>
                    {Object.keys(eachGenre).map((genre) => (
                        <div key={genre} className={styles.genres}>
                            <h2 className={styles.genreName}>{genre}</h2>
                            <ul className={styles.listOfBooks}>
                                {eachGenre[genre].map((book) => (
                                    <Link className={styles.bookListLink} key={book._id} to={`/books/${book._id}`}>
                                        <li className={styles.bookListItem} key={book._id}>{book.title} written by {book.author}</li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    ))}
                </main>
                <div className={styles.imgCont}>
                    <img src={bookList} alt="Stack of Books" className={styles.bookListImg} />
                </div>
            </div>
        </>
    )
}


export default BookList