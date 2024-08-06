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
            successMsg: '',
            isLoading: true,
            isSubmitting: false,
            isDeleting: false,
            isEditting: false,
            edit: {},
            theModal: ''
        }
    },
    mutations,
    getters,
    actions
})

export default store