import { configureStore } from '@reduxjs/toolkit';
import transactionSlice from './slices/transactionSlice';

const store = configureStore({
  reducer: {
    transaction: transactionSlice,
  },
});

export default store;
