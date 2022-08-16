import Vue from 'vue'
import vuetify from "./plugins/vuetify"
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import "./scss/main.scss"
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
import API from '@/api';
import CategorySelect from '@/components/CategorySelect';
Vue.prototype.$API = API;
Vue.component(CategorySelect.name, CategorySelect);
import HintButton from '@/components/HintButton';
Vue.component(HintButton.name, HintButton);
import '@/plugins/vcharts';
new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    render: h => h(App)
})
