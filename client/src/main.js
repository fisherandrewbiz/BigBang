import Vue from 'vue';
import axios from 'axios';
import App from '@/App.vue';
import router from '@/router/router';
import store from '@/store';

// Global components
import Icon from '@/components/Icon.vue';

Vue.component('icon', Icon);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');