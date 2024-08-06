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
    }
}

export default getters