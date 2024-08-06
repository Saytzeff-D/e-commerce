<script>
import store from '@/store';

export default {
    data(){
        return{                                            
            email: '',
            password: '',
            username: ''            
        }
    },
    methods: {
        signup(e){                
            store.commit('submit')            
            e.preventDefault()
            let payload = {
                email: this.email,
                password: this.password,  
                username: this.username              
            }
            store.dispatch('signup', payload)
        }
    },
    computed: {                
        isSubmitting(){
            return store.getters.submit
        }
    },
}
</script>
<template>
    <div class="d-flex justify-content-center pt-5">
        <form @submit="signup" className="col-lg-4 col-sm-6 border border-dark shadow pb-5 px-5 mt-3">            
            <p className='text-center h1'>Sign Up</p>                            
            <label htmlFor="email">Email</label>
            <input
                v-model="email"
                className='form-control m-1'
                name="Email"
                type="text"
                placeholder='Email Address' 
                required       
            />
            <label htmlFor="email">Username</label>
            <input
                v-model="username"
                className='form-control m-1'
                name="Username"
                type="text"
                placeholder='Username' 
                required       
            />
            <label htmlFor="password">Create Password</label>
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
                {{ isSubmitting ? 'Please wait...' : 'Sign Up' }}
            </button>
            <div>
                <a href="/signin" class="d-block">
                Already a user? Sign in
                </a>
            </div>
        </form>
    </div>
</template>