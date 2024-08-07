import router from "@/router"
import axios from "axios"

const actions = {
    getProduct({state, commit}){
        axios.get(
            `${state.url}product/all`,                
        ).then(resp=>{                       
            commit('product', resp.data.product)
        }).catch((err)=>{      
            console.log(err)          
            commit('productError', err.response ? err.response.data.message : err.message)
        })
    },
    getUserProduct({state, commit}){        
        axios.get(
            `${state.url}product/user`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.jwt}`
                }
            }
        ).then(resp=>{                
            commit('product', resp.data.product)
        }).catch((err)=>{
            commit('error', err.response ? err.response.data.message : err.message)
        })
    },
    loggedInUser({state, commit}){
        axios.get(
            `${state.url}user`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.jwt}`
                }
            }
        ).then(resp=>{                
            commit('user', resp.data.user)
        }).catch(()=>{
            router.push('/signin')
        })
    },
    signin({state, commit}, payload){        
        axios.post(`${state.url}signin`, payload).then(resp=>{  
            commit('jwt', resp.data.access_token)              
            sessionStorage.setItem('jwt', resp.data.access_token)
            router.push('/dashboard')                              
        }).catch(err=>{            
            commit('error', err.response ? err.response.data.message : err.message)
        })
    },
    signup({state, commit}, payload){
        axios.post(`${state.url}signup`, payload).then(resp=>{
            sessionStorage.setItem('successMsg', resp.data.message) 
            router.push('/signin')                
        }).catch(err=>{
            commit('error', err.response ? err.response.data.message : err.message)
        })
    },
    addProduct(context, payload){
        axios.post(
            `${context.state.url}product`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${context.state.jwt}`
                }
            }
        ).then(resp=>{                          
            sessionStorage.setItem('successMsg', resp.data.message)            
            router.push('/dashboard')
        }).catch((err)=>{                        
            context.commit('error', err.response ? err.response.data.message : err.message)
        })
    },
    deleteProduct({state, commit, dispatch}, payload){        
        axios.patch(
            `${state.url}product/delete`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.jwt}`
                }
            }
        ).then((resp)=>{                                
            dispatch('getUserProduct')
            commit('success', resp.data.message)
        }).catch((err)=>{
            commit('error', err.response ? err.response.data.message : err.message)             
        })
    },
    updateProduct(context, payload){
        axios.put(
            `${context.state.url}product/update`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${context.state.jwt}`
                }
            }
        ).then((resp)=>{
            context.commit('success', resp.data.message)
            document.location.reload()
        }).catch((err)=>{
            context.commit('error', err.response ? err.response.data.message : err.message)             
        })
    }
}

export default actions