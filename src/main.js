import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

//axios
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

// global variable
Vue.prototype.$axios = axios;
Vue.prototype.$apiURL = "https://restcountries.com/v3.1";

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: function(h) {
        return h(App);
    },
}).$mount("#app");