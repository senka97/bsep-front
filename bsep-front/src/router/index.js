import Vue from 'vue'
import Router from 'vue-router'
import CertificateForm from '../components/CertificateForm.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'CertificateForm',
            component: CertificateForm
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})