import axios from 'axios'

const baseUrl = '/api/blogs'

let tokenHeader

const setToken = (token) => tokenHeader = `bearer ${token}`

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newBlog) => {
    const config = { headers: { Authorization: tokenHeader } }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const update = async (id, updatedBlog) => {
    const config = { headers: { Authorization: tokenHeader } }
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
    return response.data
}

const deleteBlog = async (id) => {
    const config = { headers: { Authorization: tokenHeader } }
    await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, setToken, update, deleteBlog }