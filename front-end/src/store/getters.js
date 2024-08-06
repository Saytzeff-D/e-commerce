const getters = {
    allProducts(state){
        return state.product
    },
    isLoading(state){
        return state.isLoading
    },
    error(state){
        return state.errorMsg
    },
    userDetails(state){
        return state.user
    },
    submit(state){
        return state.isSubmitting
    },
    success(state){
        return state.successMsg
    },
    isDeleting(state){
        return state.isDeleting
    },
    isEditting(state){
        return state.isEditting
    },
    edit(state){
        return state.edit
    }
}

export default getters