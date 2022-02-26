import { createApp } from 'vue'
import App from './App.vue'
import './design/index.scss'
import 'vue3-carousel/dist/carousel.css'
import 'vue3-social-share/lib/index.css'
import './registerServiceWorker'
import router from './router'
import store from './state/store'
import SvgIcon from 'vue3-icon'

const app = createApp(App);
app.use(store).use(router).component("svg-icon", SvgIcon);
router.isReady().then(() => {
    app.mount('#app-root');
});
