const { createStore } = require("redux");
// state
// action -increment,decrement,reset
// reducer
// store

// constants
const increment = "increment";
const decrement = "decrement";
const reset = "reset";

// state
const initialCounter = {
  count: 0,
};

// action
const incrementAction = () => {
  return {
    type: increment,
  };
};
const decrementAction = () => {
  return {
    type: decrement,
  };
};
const resetAction = () => {
  return {
    type: reset,
  };
};

// reducer
const counterReducer = (state = initialCounter, action) => {
  switch (action.type) {
    case increment:
      return {
        // if multiple property in state that's why using spread operator
        ...state,
        count: state.count + 1,
      };
    case decrement:
      return {
        ...state,
        count: state.count - 1,
      };
    case reset:
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};

// store
const store = createStore(counterReducer);

store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch(incrementAction());
// store.dispatch(incrementAction());
// store.dispatch(incrementAction());
// store.dispatch(incrementAction());
// store.dispatch(decrementAction());
// store.dispatch(decrementAction());
// store.dispatch(resetAction());

// payload is using to provide data*******************************

// Example 1

// constants
const increment_by_value = "increment_by_value";

// state
const payloadCounter = {
  count: 5,
};
// action
const incrementByValueAction = (value) => {
  return {
    type: increment_by_value,
    payload: value,
  };
};

// reducer
const reducerWithPayload = (state = payloadCounter, action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case increment_by_value:
      return {
        count: state.count + action.payload,
      };
    default:
      return state;
  }
};

// store
const payloadStore = createStore(reducerWithPayload);

// subscribe the store to get the state current value
payloadStore.subscribe(() => {
  console.log(payloadStore.getState());
});
// dispatch the action
payloadStore.dispatch(incrementByValueAction(10));

// Example 2 *****************************************************************

// adding user and update the counter also

// state
const userCounter = {
  count: 1,
  user: ["rony"],
};

// constants
const incrementByUserNumber = "incrementByUserNumber";

// action
const incrementByUserNumberAction = (user) => {
  return {
    type: incrementByUserNumber,
    payload: user,
  };
};

// reducer
const userReducer = (state = userCounter, action) => {
  switch (action.type) {
    case incrementByUserNumber:
      return {
        count: state.count + 1,
        user: [...state.user, action.payload],
      };
    default:
      return state;
  }
};
// store
const userStore = createStore(userReducer);

// subscribe the store
userStore.subscribe(() => {
  console.log(userStore.getState());
});

userStore.dispatch(incrementByUserNumberAction("rahim"));
