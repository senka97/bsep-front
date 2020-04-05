import Vue from 'vue'
import Router from 'vue-router'
import CertificateForm from '../components/CertificateForm.vue'
import AllCertificates from '../components/AllCertificates.vue'
import startPage from '../components/startPage.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'StartPage',
            component: startPage
        },
        {
            path: '/certificateForm',
            name: 'CertificateForm',
            component: CertificateForm
        },
        {
            path: '/allCertificates',
            name: 'AllCertificates',
            component: AllCertificates
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})