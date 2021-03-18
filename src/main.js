import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import './axios.js'
import './premission.js'
// import './autoload.js'
// import './jquery.min.js'
// import './semantic.min.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.config.productionTip = false
Vue.prototype.$axios = axios //
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
