<script>
import store from '@/store';

export default {
    data(){
        return {                                    
            errMessage: ''
        }
    },
    computed: {
        products(){
            return store.getters.allProducts
        },
        error(){
            return store.getters.error
        },
        isLoading(){
            return store.getters.isLoading
        }
    },
    mounted(){
        store.dispatch('getProduct')
    }
}
</script>

<template>
    <div class="pt-5">
        <h1 class="h2 text-center">Our Product</h1>
        <hr class='container w-25'/>
        <div class="container">            
            <div class='row w-100 mx-auto' v-if="products.length !== 0 && !isLoading">
                <div class='col-lg-4 col-sm-6 my-2' v-for="(each, i) in products" :key="i">
                    <div class='card'>
                    <img alt='menuImage' :src="each.imageUrl" height="250px" />
                    <div class='card-body'>
                        <div class='card-title d-flex justify-content-between'>
                        <h4>{{each.product}}</h4>
                        <h4>#{{each.price}}</h4>
                        </div>
                        <p class='card-text text-muted'>{{each.desc}}</p>
                        <button class="btn btn-warning">Order Now</button>
                    </div>
                    </div>
                </div>                
            </div> 
            <p class="display-6 text-danger" v-if="products.length == 0 && !isLoading && error == ''">
                There are no product to list at the moment...
            </p>    
            <span class="spinner-grow" v-if="isLoading"></span>  
            <div v-if="error !== '' && !isLoading" className="alert alert-danger alert-dismissible fade show mt-2">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>ErrorMessage!</strong> {{ error }}.
            </div> 
        </div>
    </div>
</template>