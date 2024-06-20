import React from 'react'
import { useContext } from 'react'
import { ItemsContext } from '../context/context'

const ShowExpense = () => {
    let formdata = useContext(ItemsContext)
    formdata = JSON.parse(localStorage.getItem("expenses"))

    console.log(formdata)

    return (
        <div className='flex justify-center items-center'>
            <table className='flex flex-col justify-center items-center'>
                <thead>
                    <tr className='flex gap-24'>
                        <th className='w-1/3 text-center'>Item</th>
                        <th className='w-1/3 text-center'>Price</th>
                        <th className='w-1/3 text-center'>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {formdata && formdata.map((item, index) => (
                        <tr key={index} className='flex  gap-24'>
                            <td className='w-1/3 text-center -ml-7-'>{item.name}</td>
                            <td className='w-1/3 text-center pr-7'>{item.price}</td>
                            <td className='w-1/3 text-center pr-3'>{item.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowExpense
