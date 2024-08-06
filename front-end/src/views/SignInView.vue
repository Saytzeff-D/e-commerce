<script>
import store from '@/store';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data(){
        return{                                              
            email: '',
            password: '',            
        }
    },
    methods: {
        signin(e){                      
            store.commit('submit')
            e.preventDefault()
            let payload = {
                email: this.email,
                password: this.password,                              
            }
            store.dispatch('signin', payload)
        },            
    },
    computed: {                
        isSubmitting(){
            return store.getters.submit
        }
    },
    mounted(){
        let msg = sessionStorage.getItem('successMsg')
        msg ? toast.success(msg) : console.log()
        sessionStorage.removeItem('successMsg')
    }
}
</script>
<template>
    <div class="d-flex justify-content-center pt-5">
        <form @submit="signin" className="col-lg-4 col-sm-6 border border-dark shadow pb-5 px-5 mt-5">                                        
            <p className='text-center h1 py-2'>Sign In</p>                            
            <label htmlFor="email">Email</label>
            <input
                v-model="email"
                className='form-control m-1'
                name="Email"
                type="text"
                placeholder='Email Address' 
                required       
                />

            <label htmlFor="password">Password</label>
            <input
                v-model="password"
                className='form-control m-1'
                name="password" 
                type="password" 
                placeholder='Enter Password'  
                required       
            />                        
            <button
            type="submit" 
            className='btn btn-dark btn-block my-2'
            :disabled="isSubmitting"
            >
                {{ isSubmitting ? 'Please wait...' : 'Sign In' }}
            </button>
            <a href="/signup" class="d-block">
                Not a user? Sign up
            </a>
        </form>
    </div>
</template>