import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const mutations = {
    product(state, payload){
        state.product = payload
        state.isLoading = false
        state.isDeleting = false
        state.errorMsg = ''
    },
    productError(state, payload){
        state.errorMsg = payload
        state.isLoading = false
    },
    user(state, payload){
        state.user = payload
        state.isSubmitting = false
    },
    jwt(state, payload){
        state.jwt = payload
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
        state.searchedProduct = state.product.
        filter(each=>each.product.toLowerCase().includes(payload.toLowerCase()))
    },
    modal(state, payload){
        state.theModal = payload
    },
    search(state, payload){
        state.isSearching = payload
    }
}

export default mutations