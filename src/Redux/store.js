import { configureStore } from '@reduxjs/toolkit';
import craftReducer from './crafts/craftsSlice';

const store = configureStore({
  reducer: {
    crafts: craftReducer,

  },
});

export default store;
