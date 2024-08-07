<script>
import router from '@/router';
import store from '@/store';

export default {
    computed: {
        user(){
            return store.getters.userDetails
        },
        jwt(){
            return store.getters.jwt
        }
    },
    methods: {
        logout(){
            sessionStorage.removeItem('jwt')
            store.commit('user', {})
            store.commit('jwt', null)
            router.push('/signin')
        }
    }
}
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                E-Commerce
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">                
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/">
                        Home
                    </RouterLink>                
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/product">
                        Product
                    </RouterLink>                
                </li>
                <li class="nav-item" v-if="jwt !== null">
                    <RouterLink class="nav-link" to="/dashboard">
                        Dashboard
                    </RouterLink>                
                </li>
                <li class="nav-item" v-if="jwt !== null">
                    <RouterLink class="nav-link" to="/addProduct">
                        Add Product
                    </RouterLink>                
                </li>
            </ul>
            <div class="d-flex" role="search">
                <button @click="$router.push('/signin')" class="btn btn-outline-success" type="submit" v-if="!user.username">
                    Signin
                </button>                
                <div class="nav-item dropdown" v-if="user.username">
                    <button class="btn btn-outline-success dropdown-toggle" data-bs-toggle="dropdown">
                        {{user.username}}                       
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <a @click="logout()" class="dropdown-item" href="#" role="button">
                                Logout
                            </a>
                        </li>                        
                    </ul>
                </div>
            </div>
            </div>
        </div>
    </nav>
</template>