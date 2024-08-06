<script>
import router from '@/router';
import EditProductModal from '@/components/EditProductModal.vue';
import store from '@/store';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: { EditProductModal },
    data(){
        return{
            searchInput: ''
        }
    },    
    methods: {                
        deleteProduct(_id){  
            store.commit('delete')          
            store.dispatch('deleteProduct', {_id})
        },
        editProduct(product){
            store.commit('edit', product)
        },
        searchProduct(){
            let filteredProduct = this.product.
            filter(each=>each.product.toLowerCase().includes(this.searchInput.toLowerCase()))
            store.commit('searchProduct', filteredProduct)
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
        },
        isDeleting(){
            return store.getters.isDeleting
        },
        isEditting(){
            return store.getters.isEditting
        }
    },
    mounted(){
        let msg = sessionStorage.getItem('successMsg')
        if (store.state.url == null) {
            router.push('/signin')
        } else {
            store.dispatch('loggedInUser')
            store.dispatch('getUserProduct')
            msg ? toast.success(msg) : console.log()
            sessionStorage.removeItem('successMsg')
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
            <div class="col-md-6">
                <input @input="searchProduct" v-model="searchInput" class="form-control mb-2" placeholder="Search by Product Name" autofocus />
            </div>
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
                                <button @click="editProduct(each)" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-secondary mx-1" >
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