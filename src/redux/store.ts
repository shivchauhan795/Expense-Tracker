import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from "./slices/expenseSlice"

const store = configureStore({
    reducer: {
        expenses: expensesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
