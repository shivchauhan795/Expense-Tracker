import React, { useEffect, useMemo } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFormdata } from './redux/slices/expenseSlice';

function App() {
  const formdata = useSelector((state) => state.expenses.formdata);
  const dispatch = useDispatch();

  useEffect(() => {
    const dataFromStorage = JSON.parse(localStorage.getItem("expenses"));
    if (dataFromStorage) {
      dispatch(setFormdata(dataFromStorage));
    }
  }, [dispatch]);

  const totalExpense = useMemo(() => {
    return formdata.reduce((total, item) => total + parseFloat(item.price), 0);
  }, [formdata]);

  const categoryExpenses = useMemo(() => {
    return formdata.reduce((value, item) => {
      const category = item.category;
      const price = parseFloat(item.price);
      if (!value[category]) {
        value[category] = 0;
      }
      value[category] += price;
      return value;
    }, {});
  }, [formdata]);

  return (
    <div className="flex flex-col justify-center items-center h-96 gap-10">
      <h1 className='text-4xl font-bold'>Welcome to Expense Tracker</h1>
      <div className="flex gap-5 items-center">
        <span><strong>Total Expense:</strong></span>
        <div className="totalExpense">
          Rs <input className='p-2 text-center' type="number" disabled value={totalExpense.toFixed(2)} />
        </div>
      </div>
      <div className="category-expenses">
        <h2 className='text-2xl font-bold mt-4'>Category-wise Expenses</h2>
        <ul>
          {Object.keys(categoryExpenses).map((category) => (
            <li key={category} className="flex justify-between items-center w-full p-2 gap-5">
              <span><strong>{category}:</strong></span>
              <div className="category_wise_expense">
                Rs <input className='p-2 text-center' type="number" disabled value={categoryExpenses[category].toFixed(2)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App;
