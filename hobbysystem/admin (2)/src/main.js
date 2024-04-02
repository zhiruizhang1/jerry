import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
axios.defaults.baseURL = '/'

Vue.config.productionTip = false;


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$ = window.$;
Vue.prototype.layer = window.layer;

import sa from './static/sa.js';
Vue.prototype.sa = sa;
import './static/sa.css';

import SaAdminInIt from './sa-resources/sa-admin-init.js';
Vue.prototype.SaAdminInIt = SaAdminInIt;


new Vue({
	render: h => h(App)
}).$mount('#app')
