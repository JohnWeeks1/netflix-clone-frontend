import Vue from 'vue'
import helpers from './helpers'
import '@/assets/styles/app.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import PageLoader from "@/components/partials/PageLoader";

// Global Components
Vue.component('PageLoader', PageLoader)
// Global Components END

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/'

axios.interceptors.response.use((response) => {
        // Call was successful, don't do anything special.
        return response;
    }, (error) => {

        switch (error.response.status) {
            case 401: // Not logged in
            case 419: // Session expired
            case 503: // Down for maintenance
                      // Bounce the user to the login screen with a redirect back
                localStorage.removeItem('netflix-clone');
                window.location.href = '/';
                break;
            case 500:
                alert('Oops, something went wrong!  The team has been notified.');
                break;
            default:
                // Allow individual requests to handle other errors
                return Promise.reject(error);
        }
    });

Vue.config.productionTip = false;

const plugin = {
    install() {
        Vue.helpers = helpers
        Vue.prototype.$helpers = helpers
    }
}

Vue.use(plugin)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
