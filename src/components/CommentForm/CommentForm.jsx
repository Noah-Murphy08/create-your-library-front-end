import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as bookService from '../../services/bookService'
import styles from './CommentForm.module.css'


const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '' })

    const { bookId, commentId } = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        const fetchBook = async () => {
            const bookData = await bookService.show(bookId)
            setFormData(bookData.comments.find((comment) => comment._id === commentId))
        }
        if (bookId && commentId) fetchBook()
    }, [bookId, commentId])

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (bookId && commentId) {
            await bookService.updateComment(bookId, commentId, formData)
            navigate(`/books/${bookId}`)
        } else {
            props.handleAddComment(formData)
        }
        setFormData({ text: '' })
    }

    if (bookId && commentId) return (
        <main className={styles.editCommentFormCont}>
            <form onSubmit={handleSubmit} className={styles.editCommentForm}>
                <label htmlFor="text-input" className={styles.editFormLabel}>Your review:</label>
                <textarea
                    required
                    name="text"
                    id="text-input"
                    value={formData.text}
                    onChange={handleChange}
                    className={styles.editCommentTxtarea}
                />

                <button type='submit' className={styles.editCommentSubmitBtn}>Submit</button>
            </form>
        </main>
    )

    return (
        <div className={styles.commentFormCont}>
            <form onSubmit={handleSubmit} className={styles.commentForm}>
                <label htmlFor="text-input" className={styles.formLabel}>Your review:</label>
                <textarea
                    required
                    name="text"
                    id="text-input"
                    value={formData.text}
                    onChange={handleChange}
                    className={styles.commentTxtarea}
                />

                <button type='submit' className={styles.commentSubmitBtn}>Submit</button>
            </form>
        </div>
    )
}


export default CommentForm