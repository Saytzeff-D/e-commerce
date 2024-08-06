const mutations = {
    product(state, payload){
        state.product = payload
        state.isLoading = false
    },
    user(state, payload){
        state.user = payload
    }
}

export default mutations