<script>
import router from '@/router';
import axios from 'axios';

export default {
    data(){
        return {
            isLoading: true,
            url: 'http://localhost:9000/',
            product: [],
            productDesc: '',
            priceTag: '',
            imageUrl: '',
            user: {}
        }
    },
    methods: {
        deleteProduct(_id){},
        updateProduct(){}
    },
    mounted(){
        let jwt = sessionStorage.getItem('jwt')
        if (jwt == null) {
            router.push('/signin')
        } else {
            axios.get(
                `${this.url}user`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwt}`
                    }
                }
            ).then(resp=>{                
                this.user = resp.data.user
            }).catch(()=>{
                router.push('/signin')
            })
        }
    }
}
</script>

<template>
    <div class="px-5">
        <p class="display-5">
            Welcome <span class="text-success fw-bold">{{user.username}}</span>.
        </p>
        <div v-if="product.length !== 0">
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
                <tbody>
                    <tr v-for="(each, i) in product" :key="i">
                        <td>{{ i+1 }}</td>
                        <td>{{ each.menu }}</td>
                        <td>{{ each.menuDesc }}</td>
                        <td>{{ each.priceTag }}</td>
                        <td>
                            <div>
                                <button class="btn">Edit</button>
                                <button class="btn">Del</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="product.length == 0">
            <p class="lead">
                {{ user.username }} has not added any product...
            </p>
            <button class="btn btn-dark">
                Click here to add
            </button>
        </div>
    </div>
</template>