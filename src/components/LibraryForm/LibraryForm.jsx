import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as libraryService from '../../services/libraryService'
import styles from './LibraryForm.module.css'



const LibraryForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        books: []
    })

    const { libraryId } = useParams()

    useEffect(() => {
        const fetchLibrary = async () => {
            const libraryData = await libraryService.show(libraryId)
            setFormData(libraryData)
        }
        if (libraryId) fetchLibrary()
    }, [libraryId])

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleBooksChange = (event) => {
        const selectedBooks = []
        for (let i = 0; i < event.target.options.length; i++) {
            if (event.target.options[i].selected) {
                selectedBooks.push(event.target.options[i].value)
            }
        }
        setFormData({ ...formData, books: selectedBooks })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (libraryId) {
            props.handleUpdateLibrary(libraryId, formData)
        } else {
            props.handleAddLibrary(formData)
        }
    }

    return (
        <>
            <main className={styles.authContainer}>
                <h1 className={styles.title}>{libraryId ? 'Edit Library' : 'New Library'}</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrp}>
                        <label htmlFor="name-input">Name</label>
                        <input
                            required
                            type="text"
                            name="name"
                            id="name-input"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGrp}>
                        <label htmlFor="location-input">Location</label>
                        <input
                            required
                            type="text"
                            name="location"
                            id="location-input"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGrp}>
                        <label htmlFor="books-input">Books</label>
                        <select
                            name="books"
                            id="books-input"
                            value={formData.books}
                            onChange={handleBooksChange}
                            multiple
                        >
                            {props.books.map((book) => (
                                <option key={book._id} value={book._id}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className={styles.btn}>Submit</button>
                </form>
            </main>
        </>
    )
}


export default LibraryForm