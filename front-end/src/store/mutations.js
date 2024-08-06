import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const mutations = {
    product(state, payload){
        state.product = payload
        state.isLoading = false
        state.isDeleting = false
    },
    user(state, payload){
        state.user = payload
    },
    error(state, payload){
        toast.error(payload)
        state.isLoading = false
        state.isSubmitting = false
        state.isDeleting = false
        state.isEditting = false
    },
    submit(state){
        state.isSubmitting = true
    },
    success(state, payload){
        toast.success(payload)
    },
    delete(state){
        state.isDeleting = true
    },
    edit(state, payload){
        state.edit = payload
    },
    isEditting(state){
        state.isEditting = true
    },
    searchProduct(state, payload){
        state.product = payload
    },
    modal(state, payload){
        state.theModal = payload
    }
}

export default mutations