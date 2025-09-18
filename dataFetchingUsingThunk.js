const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const { thunk } = require("redux-thunk");

// constants
const getTodosRequest = "get_todos_request";
const getTodosSuccess = "get_todos_success";
const getTodosFailed = "get_todos_failed";
const api_url = "https://jsonplaceholder.typicode.com/todos";

// states
const initialTodosState = {
  isLoading: false,
  todos: [],
  error: null,
};
// actions
const getTodosRequestAction = () => {
  return {
    type: getTodosRequest,
  };
};
const getTodosSuccessAction = (todos) => {
  return {
    type: getTodosSuccess,
    payload: todos,
  };
};
const getTodosFailedAction = (error) => {
  return {
    type: getTodosFailed,
    payload: error,
  };
};
// reducers
const todosReducer = (state = initialTodosState, action) => {
  switch (action.type) {
    case getTodosRequest:
      return {
        ...state,
        isLoading: true,
      };
    case getTodosSuccess:
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
      };
    case getTodosFailed:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const fetchData = () => {
  return (dispatch) => {
    dispatch(getTodosRequestAction());
    axios
      .get(api_url)
      .then((res) => {
        const todos = res.data;
        const titles = todos.map((todo) => todo.title);
        console.log(titles);
        dispatch(getTodosSuccessAction(titles));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getTodosFailedAction(errorMessage));
      });
  };
};
// store
const store = createStore(todosReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchData());
