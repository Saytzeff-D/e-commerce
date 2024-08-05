<script>
import router from '@/router';

export default {
  methods: {
    viewProduct(){
      router.push('/product')
    }
  }
}
</script>

<template>
  <div>
    <header class="w-100 text-white" id="home" >
        <div class="w">
            <p class="text-center">Open from 10am to 12pm</p>
        </div>
        <div class="d-flex justify-content-center">
          <div class="text-center col-md-7">
            <p class="fw-bold display-1 py-5">
              E-Commerce Product Listing Application
            </p>
            <button @click="viewProduct()" class="btn btn-light">
              Let me view the Product
            </button>
          </div>
        </div>
    </header>
  </div>
</template>

<style scoped>
#home {
  background-image: url('../assets/onepage_restaurant.jpg'); 
  background-repeat: no-repeat;
  background-size: cover; 
  min-height: 650px;
}
</style>
