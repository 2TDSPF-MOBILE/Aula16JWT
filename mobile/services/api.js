import axios from "axios"

const api = axios.create({
  baseURL: "http://10.3.32.100:3000"
})

export default api