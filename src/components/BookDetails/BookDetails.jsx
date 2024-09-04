import { Link, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import * as bookService from '../../services/bookService'
import CommentForm from "../CommentForm/CommentForm"
import { AuthedUserContext } from "../../App"
import styles from './BookDetails.module.css'

const bookDetails = new URL('../images/BookDetails.jpg', import.meta.url)


const BookDetails = (props) => {
    const [book, setBook] = useState(null)
    const [likeCount, setLikeCount] = useState(0)
    const [dislikeCount, setDislikeCount] = useState(0)
    const [clickedBtn, setClickedBtn] = useState('none')
    const [refresh, setRefresh] = useState(false)

    const user = useContext(AuthedUserContext)
    const { bookId, commentId } = useParams()

    useEffect(() => {
        const fetchBook = async () => {
            const bookData = await bookService.show(bookId)
            setBook(bookData)
            setLikeCount(bookData.like.length)
            setDislikeCount(bookData.dislike.length)

            if (bookData.like.includes(user._id)) {
                setClickedBtn('like')
            } else if (bookData.like.includes(user._id)) {
                setClickedBtn('dislike')
            }
            setRefresh(false)
        }
        fetchBook()
    }, [bookId, user._id, refresh])

    const handleAddComment = async (commentFormData) => {
        const newComment = await bookService.createComment(bookId, commentFormData)
        setBook({ ...book, comments: [...book.comments, newComment] })
    }

    const handleDeleteComment = async (commentId) => {
        const deletedComment = await bookService.deleteComment(bookId, commentId)
        setBook({
            ...book,
            comments: book.comments.filter((comment) => comment._id !== commentId)
        })
    }

    const handleClick = async (type) => {
        if (type === 'like') {
            const updateBookLike = await bookService.like(bookId, user._id)
            setClickedBtn(clickedBtn === 'like' ? 'none' : 'like')
            if (clickedBtn === 'like') {
                setLikeCount(likeCount - 1)
                setClickedBtn('none')
            } else if (clickedBtn === 'dislike') {
                setDislikeCount(dislikeCount - 1)
                setLikeCount(likeCount + 1)
                setClickedBtn('like')
            } else {
                setLikeCount(likeCount + 1)
                setClickedBtn('like')
            }
        } else if (type === 'dislike') {
            const updateBookDislike = await bookService.dislike(bookId, user._id)
            setClickedBtn(clickedBtn === 'dislike' ? 'none' : 'dislike')
            if (clickedBtn === 'dislike') {
                setDislikeCount(dislikeCount - 1)
                setClickedBtn('none')
            } else if (clickedBtn === 'like') {
                setLikeCount(likeCount - 1)
                setDislikeCount(dislikeCount + 1)
                setClickedBtn('dislike')
            } else {
                setDislikeCount(dislikeCount + 1)
                setClickedBtn('dislike')
            }
        }
    }

    if (!book) return <main>Looking for Ohara Survivors...</main>
    return (
        <>
            <div className={styles.bookDetCont}>
                <main className={styles.bookDet}>
                    <header className={styles.bookDetHead}>
                        <h1>{book.title}</h1>
                        <h2>{book.genre}</h2>
                        <p>Written by: {book.author}</p>
                    </header>
                    <section className={styles.bookFeelBtns}>
                        <button
                            className={`feelButton ${clickedBtn === 'like' ? 'like-clicked' : ''}`}
                            onClick={() => handleClick('like')}
                        >
                            Like {likeCount}
                        </button>
                        <button
                            className={`feelButton ${clickedBtn === 'dislike' ? 'dislike-clicked' : ''}`}
                            onClick={() => handleClick('dislike')}
                        >
                            Dislike {dislikeCount}
                        </button>
                    </section>
                    <section className={styles.bookReviews}>
                        <h2>Reviews</h2>
                        <div className="add-comment-form">
                            <CommentForm handleAddComment={handleAddComment} setRefresh={setRefresh} />
                        </div>
                        {!book.comments.length && <p>There are no comments.</p>}

                        {book.comments.map((comment) => (
                            <article key={comment._id}>
                                <header className={styles.reviewHeader}>
                                    <p>
                                        {comment.owner.username}'s post
                                    </p>
                                    {comment.owner._id === user._id && (
                                        <>
                                            <Link to={`/books/${bookId}/comments/${comment._id}/edit`}>Edit Review</Link>
                                            <button onClick={() => handleDeleteComment(comment._id)}>
                                                Delete Review
                                            </button>
                                        </>
                                    )}
                                </header>
                                <p>{comment.text}</p>
                            </article>
                        ))}
                    </section>
                </main>
                <div className={styles.imgCont}>
                    <img src={bookDetails} alt="Open book" className={styles.bookDetImg} />
                </div>
            </div>
        </>
    )
}


export default BookDetails