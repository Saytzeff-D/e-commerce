<script>
export default {
    data(){
        return {
            product: []
        }
    }
}
</script>

<template>
    <div class="pt-5">
        <h1 class="h2 text-center">Our Product</h1>
        <hr class='container w-25'/>
        <div class="container">            
            <div class='row w-100' v-if="product.length !== 0">
                <div class='col-md-4 my-2' :v-for="(menu, i) in product" :key="i">
                    <div class='card'>
                    <img alt='menuImage' :src="menu.imageUrl" height="250px" />
                    <div class='card-body'>
                        <div class='card-title d-flex justify-content-between'>
                        <h4>{menu.menu}</h4>
                        <h4>#{menu.priceTag}</h4>
                        </div>
                        <p class='card-text text-muted'>{{menu.menuDesc}}</p>
                        <Button variant="warning">Order Now</Button>
                    </div>
                    </div>
                </div>                
            </div> 
            <p class="display-6 text-danger">
                There are no product to list at the moment...
            </p>       
        </div>
    </div>
</template>