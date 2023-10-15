<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - ${{ product.price }} - {{ product.quantity }}
      </li>
    </ul>
    <p>Total: ${{ total.toLocaleString() }}</p>
    <button :disabled="total <= 0" @click="checkout">Checkout</button>
    <p>{{ checkoutStatus }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("cart", {
      products: "cartProducts",
      total: "cartTotal",
    }),

    ...mapGetters("product", {
      productIsInStock: "productInStock",
    }),

    ...mapState({
      checkoutStatus: (state) => state.cart.checkoutStatus,
    }),
  },

  methods: {
    // you can always pass an object or an array into the helpers
    ...mapActions(["checkout"]),
  },
};
</script>

<style lang="scss" scoped></style>
