import { createApp } from 'vue';

import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(VueAxios, axios);

const sweetalertOptions = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};
app.use(VueSweetalert2, sweetalertOptions);

app.use(router);
app.mount('#app');
