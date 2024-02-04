import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  date: "",
  title:"",
  transactionType: "",
  currencyType: "",
  transactions: [],
  id: "",
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addBalance: (state, action) => {
      state.balance =
        state.balance === 0 ? +action.payload : state.balance + +(action.payload);
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
    deductBalance: (state, action) => {
      state.balance -= action.payload;
    },
    handleDate: (state, action) => {
      state.date = action.payload;
    },
    setTransactionType: (state, action) => {
      state.transactionType = action.payload;
    },

    handleTransactions: (state, action) => {
      state.transactions = [...state.transactions, action.payload];
    },

    setId: (state, action) => {
      state.id = action.payload;
    },

    handleTitle: (state, action) => {
      state.title = action.payload;
    },

    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  addBalance,
  deductBalance,
  handleDate,
  setTransactionType,
  setId,
  handleTitle,
  handleTransactions,
  deleteTransaction,
  updateBalance
} = transactionSlice.actions;
export default transactionSlice.reducer;
