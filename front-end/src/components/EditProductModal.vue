<script>
import store from '@/store';

export default {
    methods: {
        updateProduct(e){
            store.commit('isEditting')  
            e.preventDefault()
            store.dispatch('updateProduct', this.edit)
        }
    },
    computed: {
        edit(){
            return store.getters.edit
        },
        isEditting(){
            return store.getters.isEditting
        }
    },
    mounted(){
        
    }
}
</script>
<template>
    <div class="modal fade" id="exampleModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit="updateProduct" class="">                    
                    <label htmlFor="product">Product Name</label>
                    <input
                        v-model="edit.product"
                        class='form-control m-1'
                        name="Product Name"
                        type="text"
                        placeholder='Enter Product Name' 
                        required    
                        :autofocus="true"   
                        />

                    <label htmlFor="productDesc">Product Description</label>
                    <textarea
                        v-model="edit.desc"
                        class='form-control m-1'
                        name="desc" 
                        type="text" 
                        placeholder='Enter the Product Desc...'  
                        required       
                        />

                    <label htmlFor="priceTag">Price Tag</label>
                    <input
                        v-model="edit.price"
                        class='form-control m-1'
                        name="priceTag" 
                        type="number" 
                        placeholder='Enter the price tag'      
                        required  
                    />                                        
                    <button
                    type="submit" 
                    class='btn btn-dark btn-block my-2'
                    :disabled="isEditting"
                    >
                        {{ isEditting ? 'Please wait...' : 'Edit Product' }}
                    </button>
                </form>
            </div>
            </div>
        </div>
    </div>
</template>