import { createStore, createLogger } from "vuex";
import cart from "./modules/cart";
import product from "./modules/product";
// create a new store instance
const store = createStore({
  modules: {
    cart,
    product,
  },
  // data
  state: {},

  // computed properties
  getters: {},

  // methods
  actions:{},

  //  something new
  mutations: {
    // are responsible for setting and updating the state (reducer in redux);
  },
  plugins: [createLogger],
});

export default store;
