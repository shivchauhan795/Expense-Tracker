import React, { useEffect, ChangeEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { setForm, setFormdata, addExpense } from '../redux/slices/expenseSlice';
import { RootState } from '../redux/store';

const AddExpense: React.FC = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.expenses.form);
  const formdata = useSelector((state: RootState) => state.expenses.formdata);

  useEffect(() => {
    let expenses = localStorage.getItem("expenses");
    if (expenses) {
      dispatch(setFormdata(JSON.parse(expenses)));
    }
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setForm({ ...form, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    if (form.name.length > 2 && form.price && form.category) {
      const newExpense = { ...form, id: uuidv4() };
      dispatch(addExpense(newExpense));
      localStorage.setItem("expenses", JSON.stringify([...formdata, newExpense]));
      dispatch(setForm({ name: '', price: '', category: '', id: '' }));
      toast('Item Saved!!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      alert("item saved");
    } else {
      toast('Error: Item not saved!!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition="Bounce"
      />
      <ToastContainer />

      <div className='addExpense flex flex-wrap justify-center items-center min-h-[89vh]'>
        <div className='form flex flex-col gap-3'>
          <h1 className='text-4xl font-bold text-wrap text-center'>Add Expense</h1>
          <div className="input-container flex justify-between gap-5 items-center">
            <label htmlFor="name">Name:</label>
            <input
              className='p-2'
              type="text"
              id='name'
              name='name'
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-container flex justify-between gap-5 items-center">
            <label htmlFor="price">Price:</label>
            <input
              className='p-2'
              type="number"
              id='price'
              name='price'
              value={form.price}
              onChange={handleChange}
            />
          </div>
          <div className="input-container flex justify-between gap-5 items-center">
            <label htmlFor="category">Category:</label>
            <input
              className='p-2'
              type="text"
              id='category'
              name='category'
              value={form.category}
              onChange={handleChange}
            />
          </div>
          <div className="submit-container flex flex-wrap justify-center items-center">
            <input
              type="submit"
              value="Add"
              onClick={handleSubmit}
              className="submit bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddExpense;
