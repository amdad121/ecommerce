import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'
import axios from 'axios'

window.axios = axios

const app_name = 'ShopKI'
const api_url = 'http://ecommerce.test'

window.app_name = app_name
window.api_url = api_url

if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = '/api/';
} else {
	axios.defaults.baseURL = api_url + '/api/'
}

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

const app = createApp(App)

app.use(router)

app.mount('#app')
