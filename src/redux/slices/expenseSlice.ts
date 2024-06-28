import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Expense {
  id: string;
  name: string;
  price: string;
  category: string;
}

interface ExpenseState {
  form: Expense;
  formdata: Expense[];
}

const initialState: ExpenseState = {
  form: { name: '', price: '', category: '', id: '' },
  formdata: []
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<Expense>) => {
      state.form = action.payload;
    },
    setFormdata: (state, action: PayloadAction<Expense[]>) => {
      state.formdata = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.formdata.push(action.payload);
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.formdata = state.formdata.filter(item => item.id !== action.payload);
    },
  }
});

export const { setForm, setFormdata, addExpense, deleteExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
