import { createApp } from 'vue'
import App from './App.vue'
import studentService from '@/services/studentService'

let app = createApp(App)
app.config.globalProperties.$student_api = studentService

app.mount('#app')
