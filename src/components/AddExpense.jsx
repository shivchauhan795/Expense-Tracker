import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { setForm, setFormdata, addExpense } from '../redux/slices/expenseSlice';

const AddExpense = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.expenses.form);
  const formdata = useSelector((state) => state.expenses.formdata);

  useEffect(() => {
    let expenses = localStorage.getItem("expenses");
    if (expenses) {
      dispatch(setFormdata(JSON.parse(expenses)));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setForm({ ...form, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    if (form.name.length > 2 && form.price > 0 && form.category) {
      const newExpense = { ...form, id: uuidv4() };
      dispatch(addExpense(newExpense));
      localStorage.setItem("expenses", JSON.stringify([...formdata, newExpense]));
      dispatch(setForm({ name: '', price: '', category: '' }));
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
        transition="Bounce"
      />
      <ToastContainer />

      <div className='flex justify-center items-center h-96'>
        <div className='form flex flex-col gap-3'>
          <div className="inputs flex gap-2">
            <input className='border border-black pl-2' placeholder='Enter Items...' type='text' value={form.name} onChange={handleChange} name='name' />
            <input className='border border-black pl-2' placeholder='Enter Price...' type='number' value={form.price} onChange={handleChange} name='price' />
          </div>
          <div className="radioButtons flex gap-3">
            <input type="radio" id="food" name="category" value="Food" checked={form.category === "Food"} onChange={handleChange} />
            <label htmlFor="food">Food</label>
            <input type="radio" id="travel" name="category" value="Travel" checked={form.category === "Travel"} onChange={handleChange} />
            <label htmlFor="travel">Travel</label>
            <input type="radio" id="utilities" name="category" value="Utilities" checked={form.category === "Utilities"} onChange={handleChange} />
            <label htmlFor="utilities">Utilities</label>
          </div>
          <input className='border border-black cursor-pointer' type='submit' value="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default AddExpense;
