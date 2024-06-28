import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setForm, setFormdata, deleteExpense } from '../redux/slices/expenseSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
// import 'lord-icon';

interface Expense {
  id: string;
  name: string;
  price: string;
  category: string;
}

const ShowExpense: React.FC = () => {
  const dispatch = useDispatch();
  const formdata = useSelector((state: RootState) => state.expenses.formdata);
  const [displayedData, setDisplayedData] = useState<Expense[]>(formdata);
  const navigate = useNavigate();

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("expenses");
    if (dataFromStorage) {
      dispatch(setFormdata(JSON.parse(dataFromStorage)));
    }
  }, [dispatch]);

  useEffect(() => {
    setDisplayedData(formdata);
  }, [formdata]);

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setDisplayedData(formdata.filter(item => item.category === value));
    } else {
      setDisplayedData(formdata);
    }
  };

  const editData = (id: string) => {
    if (window.confirm("You have to save it after edit otherwise the data will be deleted!")) {
      const itemToEdit = formdata.find(item => item.id === id);
      if (itemToEdit) {
        dispatch(setForm(itemToEdit));
        dispatch(setFormdata(formdata.filter(item => item.id !== id)));
        navigate("/add");
      }
    }
  };

  const deleteData = (id: string) => {
    if (window.confirm("Do you really want to delete?")) {
      const updatedData = formdata.filter(item => item.id !== id);
      dispatch(deleteExpense(id));
      localStorage.setItem("expenses", JSON.stringify(updatedData));
      setDisplayedData(updatedData);
      toast('Entry Deleted!', {
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
        
      />
      <ToastContainer />
      <div className='flex flex-col flex-wrap items-center gap-5 p-10 min-h-[89vh] w-auto overflow-scroll'>
        <div className="filter">
          <select name="category" id="category" className='border border-black' onChange={handleFilter}>
            <option value="">No Filter</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Utilities">Utilities</option>
          </select>
        </div>
        {displayedData.length === 0 ? (
          <div className='m-5'>No data to display</div>
        ) : (
          <table className='flex flex-col justify-center items-center'>
            <thead>
              <tr className='flex gap-24'>
                <th className='w-1/3 text-center'>Item</th>
                <th className='w-1/3 text-center'>Price</th>
                <th className='w-1/3 text-center'>Category</th>
                <th className='w-1/3 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedData && displayedData.map((item, index) => (
                <tr key={index} className='flex gap-24'>
                  <td className='w-1/3 text-center'>{item.name}</td>
                  <td className='w-1/3 text-center'>{item.price}</td>
                  <td className='w-1/3 text-center'>{item.category}</td>
                  <td className='w-1/3 text-center cursor-pointer' onClick={() => { editData(item.id) }}>
                    {/* <lord-icon
                      src="https://cdn.lordicon.com/gwlusjdu.json"
                      trigger="hover"
                      colors="primary:#121331,secondary:#08a88a"
                      style={{ width: '25px', height: '25px' }}>
                    </lord-icon> */}
                    edit
                  </td>
                  <td className='w-1/3 text-center cursor-pointer' onClick={() => { deleteData(item.id) }}>
                    {/* <lord-icon
                      src="https://cdn.lordicon.com/skkahier.json"
                      trigger="hover"
                      colors="primary:#121331,secondary:#c71f16"
                      style={{ width: '25px', height: '25px' }}>
                    </lord-icon> */}
                    delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ShowExpense;
