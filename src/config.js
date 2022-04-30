import axios from 'axios'

const axoisInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
  })
  
  export default axoisInstance
  