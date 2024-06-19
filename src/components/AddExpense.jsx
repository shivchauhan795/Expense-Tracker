import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { ItemsContext } from '../context/context';

const AddExpense = () => {
    const [form, setForm] = useState({ name: '', price: '', category: '' })
    const [formdata, setFormdata] = useState([])

    useEffect(() => {
        let expenses = localStorage.getItem("expenses")
        if (expenses) {
            setFormdata(JSON.parse(expenses))
        }
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        if (form.name.length > 2 && form.price > 0 && form.category) {
            setFormdata([...formdata, { ...form, id: uuidv4() }])
            localStorage.setItem("expenses", JSON.stringify([...formdata, { ...form, id: uuidv4() }]))
            setForm({ name: '', price: '', category: '' })
            console.log([...formdata, form])
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
            alert("item saved")
        }
        else {
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
    }
    return (
        <>
            <ItemsContext.Provider value={{formdata, setFormdata}}>


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
            </ItemsContext.Provider>
        </>
    )
}

export default AddExpense
