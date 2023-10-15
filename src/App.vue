<template>
  <div>
    <ProductList />
    <hr>
    <ShoppingCart/>
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import ShoppingCart from "./components/ShoppingCart.vue";

export default {
  name: "App",
  components: {
    ProductList,
    ShoppingCart,
  },
};
</script>

<style></style>
