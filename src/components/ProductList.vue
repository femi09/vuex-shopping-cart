<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="" />
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }} - {{ product.inventory }}
        <button
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)"
        >
          Add to Cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
    };
  },
 
  computed: {
     //   using mapstate and map getters
    ...mapState({
      products: (state) => state.product.items,
    }),

    ...mapGetters('product', {
        productIsInStock: 'productIsInStock'
    }),

    // productIsInStock() {
    //   return this.$store.getters.productIsInStock;
    // },
  },
  created() {
    this.loading = true;
    this.fetchProducts().then(() => (this.loading = false));
  },

  methods: {
    ...mapActions({
        fetchProducts:'product/fetchProducts',
        addProductToCart: 'cart/addProductToCart'
    }),
  },
};
</script>

<style scoped></style>
