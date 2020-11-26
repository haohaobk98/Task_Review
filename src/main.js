// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')


import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";
// import AntVue from 'ant-design-vue'
// import { BootstrapVue } from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(Antd);
// Vue.use(AntVue)
// Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
