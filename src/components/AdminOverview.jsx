import { useState, useEffect } from 'react'
import API_URL from "../constants/api";
const overview = {
    "totalItemsSold": 12,
    "totalUnsoldItems": 169,
    "totalClients": 1,
    "totalDeliveries": 3
}
function AdminOverview() {
    const [overview, setOverview] = useState({})

    const fetchOverview = async () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', `${API_URL}report/overview`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    setOverview(JSON.parse(xhr.responseText))
                }
            }
        }
        xhr.send()
    }

    useEffect(()=> {
        fetchOverview()
    },[])

  return (
      <div className='flex justify-center flex-col shadow-sm bg-white p-4 rounded-md mt-4 mb-4'>
        <h2 className='font-medium text-md mb-4'>Overview</h2>
        <div className='flex items-center justify-between mx-12 my-4'>
            <div className='flex items-center gap-4'>
                <div className='w-20 h-20 shadow-md bg-green-400 rounded-md'>
                </div>
                <div>
                    <h4 className='text-sm'>Items Sold</h4>
                    <h3 className='text-2xl font-medium'>{overview.totalItemsSold}</h3>
                </div>
                
            </div>
            <div className='flex items-center gap-4'>
                <div className='w-20 h-20 shadow-md bg-red-400 rounded-md'>
                </div>
                <div>
                    <h4 className='text-sm'>Unsold Items</h4>
                    <h3 className='text-2xl font-medium'>{overview.totalUnsoldItems}</h3>
                </div>
                
            </div>
            <div className='flex items-center gap-4'>
                <div className='w-20 h-20 shadow-md bg-yellow-400 rounded-md'>
                </div>
                <div>
                    <h4 className='text-sm'>Shipped Out</h4>
                    <h3 className='text-2xl font-medium'>{overview.totalDeliveries}</h3>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='w-20 h-20 shadow-md bg-blue-400 rounded-md'>
                </div>
                <div>
                    <h4 className='text-sm'>Clients</h4>
                    <h3 className='text-2xl font-medium'>{overview.totalClients}</h3>
                </div>
                
            </div>
        </div>
      </div>
  )
}

export default AdminOverview
