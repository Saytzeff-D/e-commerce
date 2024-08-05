<script>
export default {
    data(){
        return{
            url: 'http://localhost:9000/',
            serverMessage: {
                status: '',
                msg: ''
            },
            product: '',
            productDesc: '',
            priceTag: '',
            imageUrl: ''
        }
    },
    methods: {
        addProduct(e){
            e.preventDefault()
            let payload = {
                product: this.product,
                desc: this.productDesc,
                price: this.priceTag,
                image: this.imageUrl
            }
            console.log(payload)
        },
        pickFile(e){
            const fs = new FileReader
            fs.readAsDataURL(e.target.files[0])
            fs.onload=()=>{
            console.log(fs.result)
            this.imageUrl = fs.result
            }
        }
    }
}
</script>
<template>
    <div class="d-flex justify-content-center">
        <form @submit="addProduct" className="col-md-6 border border-dark shadow pb-5 px-5 mt-5">
            <p className='text-center h1 py-2'>Add Product</p>  
            <div v-if="serverMessage.status === 302" className="alert alert-danger alert-dismissible">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>ErrorMessage!</strong> {serverMessage.msg}.
            </div>                  
            <div v-if="serverMessage.status === 202" className="alert alert-success alert-dismissible">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>Success!</strong> {serverMessage.msg}.
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
            
            <label htmlFor="imageUrl">Image of the product</label>
            <input
            className='form-control m-1'
            type="file" 
            @change="pickFile"
            required
            />
            <button
            type="submit" 
            className='btn btn-dark btn-block my-2'
            >
                Add Product
            </button>
        </form>
    </div>
</template>