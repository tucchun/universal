import axios from 'axios'

const instances = axios.create({
  baseURL: '/'
})

export default instances