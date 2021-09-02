import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.peladadosamigos.com.br/backend/index.php'
})

export default api;