import { useState } from "react";

import styles from './BookForm.module.css'


const BookForm = (props) => {

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: 'Fantasy',
    })

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleAddBook(formData)
    }

    return (
        <>
            <main className={styles.authContainer}>
                <h1 className={styles.title}>Create a Book</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrp}>
                        <label htmlFor="title-input">Title</label>
                        <input
                            required
                            type="text"
                            name="title"
                            id="title-input"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGrp}>
                        <label htmlFor="author-input">Author</label>
                        <input
                            required
                            type="text"
                            name="author"
                            id="author-input"
                            value={formData.author}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGrp}>
                        <label htmlFor="genre-input">Genre</label>
                        <select
                            required
                            name="genre"
                            id="genre-input"
                            value={formData.genre}
                            onChange={handleChange}
                        >

                            <option value="Fantasy">Fantasy</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Horror">Horror</option>
                            <option value="Romance">Romance</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Magical Realism">Magical Realism</option>
                            <option value="Realist">Realist</option>
                            <option value="Historical">Historical</option>
                        </select>
                    </div>

                    <button type="submit" className={styles.btn}>Submit</button>
                </form>
            </main>
        </>
    )
}


export default BookForm