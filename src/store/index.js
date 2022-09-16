import { configureStore } from "@reduxjs/toolkit";
import heroes from "../components/heroesList/heroesSlice";
import filters from "../components/heroesFilters/filtersSlice";

// const store = createStore(
//   combineReducers({ heroes, filters }),
//   compose(
//     applyMiddleware(ReduxThunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const store = configureStore({
  reducer: { heroes, filters },
  middleware: (getdefaultMiddleware) => getdefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
