<script>
import router from '@/router';
import axios from 'axios';
import EditProductModal from '@/components/EditProductModal.vue';
import store from '@/store';

export default {
  components: { EditProductModal },
    data(){
        return {                        
            isDeleting: false,                               
        }
    },
    methods: {                
        deleteProduct(_id){            
            this.isDeleting = true
            axios.patch(
                `${store.state.url}product/delete`,
                {_id},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${store.state.jwt}`
                    }
                }
            ).then(resp=>{                                
                this.getProduct()
                this.isDeleting = false
            }).catch((err)=>{
                this.isDeleting = false                
            })
        }        
    },
    computed: {
        user(){
            return store.getters.userDetails
        },
        product(){
            return store.getters.allProducts
        },
        isLoading(){
            return store.getters.isLoading
        }
    },
    mounted(){
        if (store.state.url == null) {
            router.push('/signin')
        } else {
            store.dispatch('loggedInUser')
            store.dispatch('getUserProduct')
        }
    }
}
</script>

<template>
    <div class="px-5">
        <p class="display-5">
            Welcome <span class="text-success fw-bold">{{user.username}}</span>.
        </p>
        <span class="spinner-grow" v-if="isLoading"></span>
        <div v-if="product.length !== 0 && !isLoading">
            <p class="lead">
                Below is the list of your product
            </p>
            <table class="table table-light">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-if="!isLoading">
                    <tr v-for="(each, i) in product" :key="i">
                        <td>{{ i+1 }}</td>
                        <td>{{ each.product }}</td>
                        <td>{{ each.desc }}</td>
                        <td>{{ each.price }}</td>
                        <td>
                            <div>
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-secondary mx-1">
                                    Edit
                                </button>
                                <button :disabled="isDeleting" @click="deleteProduct(each._id)" class="btn btn-dark mx-1">
                                    <span v-if="!isDeleting">Del</span>
                                    <span v-if="isDeleting" class="spinner-border spinner-border-sm"></span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="product.length == 0 && !isLoading">
            <p class="lead">
                {{ user.username }} has not added any product...
            </p>
            <button @click="$router.push('/addProduct')" class="btn btn-dark">
                Click here to add
            </button>
        </div>
    </div>
    <edit-product-modal />
</template>