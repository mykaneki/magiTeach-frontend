import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/display.css';
import Clipboard from 'v-clipboard'

Vue.use(Clipboard)



Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
