<script>
import router from '@/router';
import store from '@/store';
import axios from 'axios';

export default {
    data(){
        return{                       
            errMessage: '',
            product: '',
            productDesc: '',
            priceTag: '',
            image: '',
            isLoading: false
        }
    },
    methods: {
        addProduct(e){
            this.isLoading = true
            e.preventDefault()
            let payload = {
                product: this.product,
                desc: this.productDesc,
                price: this.priceTag,
                image: this.image
            }
            axios.post(
                `${store.state.url}product`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${store.state.jwt}`
                    }
                }
            ).then(resp=>{  
                console.log(resp.data)              
                router.push('/dashboard')
            }).catch((err)=>{
                console.log(err)
                this.isLoading = false
                this.errMessage = err.response ? err.response.data.message : err.message
            })
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
        <form @submit="addProduct" className="col-md-6 border border-dark shadow pb-5 px-5 mt-5">
            <p className='text-center h1 py-2'>Add Product</p>  
            <div v-if="errMessage !== ''" className="alert alert-danger alert-dismissible fade show mt-2">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>ErrorMessage!</strong> {{errMessage}}.
            </div>                           
            <label htmlFor="product">Product Name</label>
            <input
                v-model="product"
                className='form-control m-1'
                name="Product Name"
                type="text"
                placeholder='Enter Product Name' 
                required       
                />

            <label htmlFor="productDesc">Product Description</label>
            <textarea
                v-model="productDesc"
                className='form-control m-1'
                name="productDesc" 
                type="text" 
                placeholder='Enter the Product Desc...'  
                required       
                />

            <label htmlFor="priceTag">Price Tag</label>
            <input
                v-model="priceTag"
                className='form-control m-1'
                name="priceTag" 
                type="number" 
                placeholder='Enter the price tag'      
                required  
            />
            
            <label htmlFor="image">Image of the product</label>
            <input
            className='form-control m-1'
            type="file" 
            @change="pickFile"
            required
            />
            <button
            type="submit" 
            className='btn btn-dark btn-block my-2'
            :disabled="isLoading"
            >
                {{ isLoading ? 'Please wait...' : 'Add Product' }}
            </button>
        </form>
    </div>
</template>