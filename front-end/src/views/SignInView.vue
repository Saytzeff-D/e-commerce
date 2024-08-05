<script>
import router from '@/router';
import axios from 'axios';

export default {
    data(){
        return{
            isLoading: false,
            url: 'http://localhost:9000/',
            successMsg: '',
            errMessage: '',
            email: '',
            password: '',            
        }
    },
    methods: {
        signin(e){
            this.successMsg = ''
            this.errMessage = ''
            this.isLoading = true
            e.preventDefault()
            let payload = {
                email: this.email,
                password: this.password,                              
            }
            axios.post(`${this.url}signin`, payload).then(resp=>{                
                sessionStorage.setItem('jwt', resp.data.access_token)
                router.push('/dashboard')                              
            }).catch(err=>{
                this.errMessage = err.response.data.message
                this.isLoading = false
            })
        },            
    }
}
</script>
<template>
    <div class="d-flex justify-content-center pt-5">
        <form @submit="signin" className="col-lg-4 col-sm-6 border border-dark shadow pb-5 px-5 mt-5">
            <div v-if="errMessage !== ''" className="alert alert-danger alert-dismissible fade show mt-2">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>ErrorMessage!</strong> {{errMessage}}.
            </div>                              
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
            :disabled="isLoading"
            >
                {{ isLoading ? 'Please wait...' : 'Sign In' }}
            </button>
            <a href="/signup" class="d-block">
                Not a user? Sign up
            </a>
        </form>
    </div>
</template>