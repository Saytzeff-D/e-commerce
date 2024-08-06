import router from "@/router"
import axios from "axios"

const actions = {
    getProduct({state, commit}){
        axios.get(
            `${state.url}product/all`,                
        ).then(resp=>{                       
            commit('product', resp.data.product)
        }).catch((err)=>{                
            commit('error', err.response ? err.response.data.message : err.message)
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
    }
}

export default actions