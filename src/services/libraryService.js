

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/libraries`;


const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const show = async (libraryId) => {
    try {
        const res = await fetch(`${BASE_URL}/${libraryId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const create = async (libraryFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libraryFormData)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const deleteLibrary = async (libraryId) => {
    try {
        const res = await fetch(`${BASE_URL}/${libraryId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}


export {
    index,
    show,
    create,
    deleteLibrary,
    
}