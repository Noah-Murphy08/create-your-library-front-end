import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as libraryService from '../../services/libraryService'



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
            <main>
                <form onSubmit={handleSubmit}>
                    <h1>{libraryId ? 'Edit Library' : 'New Library'}</h1>
                    <label htmlFor="name-input">Name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        id="name-input"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="location-input">Location</label>
                    <input
                        required
                        type="text"
                        name="location"
                        id="location-input"
                        value={formData.location}
                        onChange={handleChange}
                    />
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

                    <button type="submit">Submit</button>
                </form>
            </main>
        </>
    )
}


export default LibraryForm