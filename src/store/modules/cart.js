import shop from "@/api/shop";
export default {
 namespaced:true,
  state: {
    items: [],
    checkoutStatus: null,
  },

  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map((cartItem) => {
        const product = rootState.product.items.find(
          (product) => product.id === cartItem.id
        );
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity,
        };
      });
    },

    cartTotal(state, getters) {
      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
  },

  actions: {
    addProductToCart(context, product, rootGetters) {
      if (rootGetters['products/productIsInStock'](product)) {
        // find cartItem
        const cartItem = context.state.cart.find(
          (item) => item.id == product.id
        );
        if (!cartItem) {
          context.commit("pushProductToCart", product.id);
        } else {
          context.commit("incrementItemQuantity", cartItem);
        }
        context.commit("product/decrementProductInventory", product, {root:true});
      }
    },

    checkout(context) {
      shop.buyProducts(
        context.state.cart,
        () => {
          context.commit("emptyCart");
          context.commit("setCheckoutStatus", "success");
        },
        () => {
          context.commit("setCheckoutStatus", "fail");
        }
      );
    },
  },

  mutations: {
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1,
      });
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },

    emptyCart(state) {
      state.cart = [];
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
  },
};
