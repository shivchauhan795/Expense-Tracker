import React from 'react'
import { useContext } from 'react'
import { ItemsContext } from '../context/context'

const ShowExpense = () => {
    const  formdata  = useContext(ItemsContext)
    console.log({ formdata });
    return (
        <div className='flex justify-center items-center'>
            <table>
                <thead>
                    <tr className='flex gap-10'>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {formdata && formdata.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowExpense
