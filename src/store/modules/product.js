import shop from "@/api/shop";
export default {
 namespaced:true,
  state: {
    items: [],
  },

  getters: {
    availableProducts(state) {
      return state.items.filter((product) => product.inventory > 0);
    },

    productIsInStock() {
      return (products) => {
        return products.inventory > 0;
      };
    },
  },

  actions: {
    fetchProducts(context) {
      // make api calls to get the products
      return new Promise((resolve) => {
        shop.getProducts((products) => {
          // commit a mutation
          context.commit("setProducts", products);
          resolve();
        });
      });
    },
  },

  mutations: {
    setProducts(state, products) {
      //update products
      state.products = products;
    },

    decrementProductInventory(state, product) {
      product.inventory--;
    },
  },
};
