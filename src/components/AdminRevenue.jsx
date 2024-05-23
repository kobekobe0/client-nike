import {useState, useEffect} from 'react'
import API_URL from "../constants/api";
import OrderCard from './OrderCard';
import { useNavigate } from 'react-router-dom';

function AdminRevenue() {
    const navigate = useNavigate()
    const [revenue, setRevenue] = useState({})
    const fetchRevenue = async () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', `${API_URL}report/revenue`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    console.log(JSON.parse(xhr.responseText))
                    setRevenue(JSON.parse(xhr.responseText))
                }
            }
        }
        xhr.send()
    }

    useEffect(()=> {
        fetchRevenue()
    }, [])
  return (
    <>
        <div className='flex justify-between shadow-sm bg-white p-4 rounded-md mb-4'>
        <div className='flex flex-col justify-center'>
            <h2 className='font-medium text-md'>Revenue</h2>
            <div className='flex items-end ml-4 my-8 gap-2'>
                <h3 className='font-medium text-8xl opacity-75'>₱ {revenue?.totalRevenue?.toLocaleString() || 0} </h3>
                <p className='text-green-600 text-xs font-medium'>% {(((revenue.totalRevenue - (revenue.totalRevenue - revenue.totalSalesToday))/(revenue.totalRevenue - revenue.totalSalesToday))*100).toFixed(2)} increase from yesterday</p>
            </div>
        </div>
      </div>

            <div className='flex justify-between shadow-sm bg-white p-4 rounded-md'>
        <div className='w-full'>
            <div className='font-medium text-md flex justify-between items-center'>
                <h2>Recent To Pack Orders</h2>
                <button className='text-sm hover:bg-gray-200 p-2 rounded-sm duration-100 ease-in-out' onClick={()=> navigate('/admin/orders')}>View All Orders</button>
            </div>
            <div className='flex flex-col gap-4 mt-4 w-full'>
                {
                    revenue.recentApprovedOrders && 
                        revenue?.recentApprovedOrders.map((order, index) => (
                            <OrderCard key={index} order={order} status={order.status}/>
                        ))
                }
            </div>
        </div>
      </div>
    </>

  )
}

export default AdminRevenue
