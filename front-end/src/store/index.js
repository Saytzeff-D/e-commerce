import { createStore } from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const store = createStore({
    state() {
        return {
            jwt: sessionStorage.getItem('jwt'),
            url: 'http://localhost:9000/',
            user: {},
            product: [],
            errorMsg: '',
            isLoading: true
        }
    },
    mutations,
    getters,
    actions
})

export default store