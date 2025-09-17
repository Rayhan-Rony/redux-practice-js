// state
// action
// reducers
// store

const { createStore, combineReducers } = require("redux");

// example 1
// products state
const initialProductsCounter = {
  products: ["pen", "pencil"],
  numberOfProducts: 2,
};
const initialCartsCounter = {
  cart: ["pen"],
  numberOfProducts: 1,
};

// product constants
const get_products = "get_products";
const add_products = "add_products";
// cart constants
const get_cart = "get_cart";
const add_cart = "add_cart";

// products action
const addProducts = (product) => {
  return {
    type: add_products,
    payload: product,
  };
};
const getProducts = () => {
  return {
    type: get_products,
  };
};
// cart action
const addCart = (product) => {
  return {
    type: add_cart,
    payload: product,
  };
};
const getCart = () => {
  return {
    type: get_cart,
  };
};
// product reducer
const productReducer = (state = initialProductsCounter, action) => {
  switch (action.type) {
    case add_products:
      return {
        numberOfProducts: state.numberOfProducts + 1,
        products: [...state.products, action.payload],
      };
    case get_products:
      return { ...state };
    default:
      return state;
  }
};
// cart reducer
const cartReducer = (state = initialCartsCounter, action) => {
  switch (action.type) {
    case add_cart:
      return {
        numberOfProducts: state.numberOfProducts + 1,
        cart: [...state.cart, action.payload],
      };
    case get_cart:
      return { ...state };
    default:
      return state;
  }
};

// to use multiple reducer declare a root reducer and call combineReducers it expects object
const rootReducers = combineReducers({
  productR: productReducer,
  cartR: cartReducer,
});
// store
const store = createStore(rootReducers);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(getProducts());
store.dispatch(addProducts("eraser"));
store.dispatch(getCart());
store.dispatch(addCart("pencil"));
