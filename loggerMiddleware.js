const { createStore, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");
// state
// action
// reducers
// store
// example 1 ********************
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
// ***************************************************************************************************
// middle ware for add extra feature in redux logger middleware can show the prev state action and next state at a time .
// if developers need to use middleware they need to call applyMiddleware from redux
/******************************************************************************************** */
// store
const store = createStore(productReducer, applyMiddleware(logger));

store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch(getProducts());
// store.dispatch(addProducts("eraser"));
