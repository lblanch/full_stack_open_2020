import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => (
    axios.get(baseUrl)
        .then((response) => response.data)
)

const createPerson = (newPerson) => (
    axios.post(baseUrl, newPerson)
        .then((response) => response.data)
)

const updatePerson = (modifiedPerson, id) => (
    axios.put(`${baseUrl}/${id}`, modifiedPerson)
        .then((response) => response.data)
)

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, createPerson, updatePerson, deletePerson }