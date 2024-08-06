<script>
import store from '@/store';

export default {
    data(){
        return{                               
            product: '',
            productDesc: '',
            priceTag: '',
            image: '',            
        }
    },
    computed: {                
        isSubmitting(){
            return store.getters.submit
        }
    },
    methods: {
        addProduct(e){ 
            store.commit('submit')       
            e.preventDefault()
            let payload = {
                product: this.product,
                desc: this.productDesc,
                price: this.priceTag,
                image: this.image
            }
            store.dispatch('addProduct', payload)
        },
        pickFile(e){
            const fs = new FileReader
            fs.readAsDataURL(e.target.files[0])
            fs.onload=()=>{            
            this.image = fs.result
            }
        }
    }
}
</script>
<template>
    <div class="d-flex justify-content-center">
        <form @submit="addProduct" class="col-md-6 border border-dark shadow pb-5 px-5 mt-5">
            <p class='text-center h1 py-2'>Add Product</p>                                        
            <label htmlFor="product">Product Name</label>
            <input
                v-model="product"
                class='form-control m-1'
                name="Product Name"
                type="text"
                placeholder='Enter Product Name' 
                required       
                />

            <label htmlFor="productDesc">Product Description</label>
            <textarea
                v-model="productDesc"
                class='form-control m-1'
                name="productDesc" 
                type="text" 
                placeholder='Enter the Product Desc...'  
                required       
                />

            <label htmlFor="priceTag">Price Tag</label>
            <input
                v-model="priceTag"
                class='form-control m-1'
                name="priceTag" 
                type="number" 
                placeholder='Enter the price tag'      
                required  
            />
            
            <label htmlFor="image">Image of the product</label>
            <input
            class='form-control m-1'
            type="file" 
            @change="pickFile"
            required
            />
            <button
            type="submit" 
            class='btn btn-dark btn-block my-2'
            :disabled="isSubmitting"
            >
                {{ isSubmitting ? 'Please wait...' : 'Add Product' }}
            </button>
        </form>
    </div>
</template>