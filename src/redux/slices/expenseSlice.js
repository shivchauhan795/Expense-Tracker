import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  form: { name: '', price: '', category: '' },
  formdata: []
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setFormdata: (state, action) => {
      state.formdata = action.payload;
    },
    addExpense: (state, action) => {
      state.formdata.push(action.payload);
    },
    deleteExpense: (state, action) => {
      state.formdata = state.formdata.filter(item => item.id !== action.payload);
    },
  }
});

export const { setForm, setFormdata, addExpense, deleteExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
