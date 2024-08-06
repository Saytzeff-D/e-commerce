<script>
import store from '@/store';
import axios from 'axios';

export default {
    data(){
        return{
            isLoading: false,            
            successMsg: '',
            errMessage: '',
            email: '',
            password: '',
            username: ''            
        }
    },
    methods: {
        signup(e){
            this.successMsg = ''
            this.errMessage = ''
            this.isLoading = true
            e.preventDefault()
            let payload = {
                email: this.email,
                password: this.password,  
                username: this.username              
            }
            axios.post(`${store.state.url}signup`, payload).then(resp=>{
                this.successMsg = resp.data.message
                this.isLoading = false
                this.resetForm()
            }).catch(err=>{
                this.isLoading = false
                this.errMessage = err.response ? err.response.data.message : err.message
            })
        },
        resetForm(){
            this.email = ''
            this.password = ''
            this.username = ''
        }      
    }
}
</script>
<template>
    <div class="d-flex justify-content-center pt-5">
        <form @submit="signup" className="col-lg-4 col-sm-6 border border-dark shadow pb-5 px-5 mt-3">
            <div v-if="errMessage !== ''" className="alert alert-danger alert-dismissible fade show mt-2">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>ErrorMessage!</strong> {{errMessage}}.
            </div>                  
            <div v-if="successMsg !== ''" className="alert alert-success alert-dismissible fade show mt-2">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Success!</strong> {{successMsg}}.
            </div> 
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
            :disabled="isLoading"
            >
                {{ isLoading ? 'Please wait...' : 'Sign Up' }}
            </button>
            <div>
                <a href="/signin" class="d-block">
                Already a user? Sign in
                </a>
            </div>
        </form>
    </div>
</template>