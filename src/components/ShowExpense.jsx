import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setForm, setFormdata, deleteExpense } from '../redux/slices/expenseSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ShowExpense = () => {
  const dispatch = useDispatch()
  const formdata = useSelector((state) => state.expenses.formdata)
  const [displayedData, setDisplayedData] = useState(formdata)
  const navigate = useNavigate()


  useEffect(() => {
    const dataFromStorage = JSON.parse(localStorage.getItem("expenses"))
    if (dataFromStorage) {
      dispatch(setFormdata(dataFromStorage))
    }
  }, [dispatch])

  useEffect(() => {
    setDisplayedData(formdata);
  }, [formdata]);



  const handleFilter = (e) => {
    const value = e.target.value;
    if (value) {
      setDisplayedData(formdata.filter(item => item.category === value));
    } else {
      setDisplayedData(formdata);
    }
  };

  const editData = (id) => {
    let c = confirm("You have to save it after edit otherwise the data will be deleted!!")
    deleteData(id)
    if (c) {
      dispatch(setForm(formdata.filter(item => item.id === id)[0]))
      dispatch(setFormdata(formdata.filter(item => item.id !== id)))
      navigate("/add");
    }
  };

  const deleteData = (id) => {
    let c = confirm("Do you really want to Delete?");
    if (c) {
      dispatch(deleteExpense(id))
      localStorage.setItem("expenses", JSON.stringify(formdata.filter(item => item.id !== id)))
      setDisplayedData(JSON.parse(localStorage.getItem("expenses")))
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
        transition="Bounce"
      />
      <ToastContainer />
      <div className='flex flex-col items-center gap-5 p-10'>
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
                <tr key={index} className='flex  gap-24'>
                  <td className='w-1/3 text-center -ml-7-'>{item.name}</td>
                  <td className='w-1/3 text-center pr-7'>{item.price}</td>
                  <td className='w-1/3 text-center pr-3'>{item.category}</td>
                  <td className='w-1/3 text-center pr-3 cursor-pointer' onClick={() => { editData(item.id) }}>
                    <lord-icon
                      style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "5px" }}
                      src="https://cdn.lordicon.com/gwlusjdu.json"
                      trigger="hover" >
                    </lord-icon>
                  </td>
                  <td className='w-1/3 text-center pr-3 cursor-pointer' onClick={() => { deleteData(item.id) }}>
                    <lord-icon
                      style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "5px" }}
                      src="https://cdn.lordicon.com/skkahier.json"
                      trigger="hover" >
                    </lord-icon>
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
