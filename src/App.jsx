import React, { useEffect, useMemo } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFormdata } from './redux/slices/expenseSlice';
import { Chart } from "react-google-charts";


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

  const pieChartData = useMemo(() => {
    const data = [["Category", "Amount"]];
    for (const category in categoryExpenses) {
      data.push([category, categoryExpenses[category]]);
    }
    return data;
  }, [categoryExpenses]);

  const options = {
    is3D: true,
    slices: {
      1: { offset: 0.4 },
      2: { offset: 0.4 },
      3: { offset: 0.4 },
    },
  };

  return (
    <div className="flex flex-col flex-wrap items-center min-h-[89vh] gap-5 mt-16">
      <h1 className='text-4xl font-bold text-wrap text-center'>Welcome to TrackTally</h1>
      <p className='font-thin mb-5 -mt-2'>Your Trusted Money Tracking Website</p>
      <div className="flex gap-5 items-center">
        <span><strong>Total Expense:</strong></span>
        <div className="totalExpense">
          Rs <input className='p-2 text-center' type="number" disabled value={totalExpense.toFixed(2)} />
        </div>
      </div>
      {totalExpense > 0 &&
        <div className="flex flex-wrap justify-center items-center gap-16 p-6">

          <div className="category-expenses flex flex-col justify-center items-center gap-10">
            <h2 className='text-2xl font-bold mt-4 text-center'>Category-wise Expenses</h2>
            <ul>
              {Object.keys(categoryExpenses).map((category) => (
                <li key={category} className="flex flex-wrap justify-between items-center w-full p-2 gap-5">
                  <span><strong>{category}:</strong></span>
                  <div className="category_wise_expense">
                    Rs <input className='p-2 text-center' type="number" disabled value={categoryExpenses[category].toFixed(2)} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pieChart">
            <Chart
              chartType="PieChart"
              data={pieChartData}
              options={options}
              width={"300px"}
              height={"300px"}
            />
          </div>

        </div>
      }
      {!totalExpense && <div className='font-thin text-red-400'>No Data to display</div>}
    </div>
  )
}

export default App;
