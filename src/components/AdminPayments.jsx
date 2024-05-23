import {useState, useEffect} from 'react'
import API_URL from "../constants/api";

function AdminPayments() {
    const [paymentMethods, setPaymentMethods] = useState([])
    const fetchPayments = async () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', `${API_URL}report/payment-methods`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    setPaymentMethods(JSON.parse(xhr.responseText))
                }
            }
        }
        xhr.send()
    }
    useEffect(()=> {
        fetchPayments()
    },[])
  return (
          <div className='w-1/3 bg-white shadow-md p-4'>
                <h3 className='mb-12 font-medium text-md'>Modes Of Payment</h3>
                <div className='flex flex-col gap-12 pb-8'>
                    {
                        paymentMethods.map((method, index) => (
                            <div className='flex justify-between items-center' key={index}>
                                <div className='flex justify-start items-center gap-2'>
                                    <div className='w-12 h-12 rounded-md bg-blue-300'></div>
                                    <div>
                                        <h3 className='text-lg text-gray-700 font-medium'>{method.paymentMethod}</h3>
                                        <p>Received payment</p>
                                    </div>
                                </div>
                                <div>
                                    <h2 className='text-2xl font-medium text-gray-700'>₱ {method.totalSales.toLocaleString()}</h2>
                                </div>
                            </div>
                        ))
                    }

                </div>
          </div>
  )
}

export default AdminPayments
