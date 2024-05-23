import {useState, useEffect} from 'react'
import API_URL from "../constants/api";


function AdminTopSelling() {
    const [topSelling, setTopSelling] = useState([])

    const fetchTopSelling = async () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', `${API_URL}report/top-selling`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    setTopSelling(JSON.parse(xhr.responseText))
                }
            }
        }
        xhr.send()
    }

    useEffect(()=> {
        fetchTopSelling()
    },[])

  return (
          <div className='w-2/3 bg-white shadow-md p-4'>
             <h3 className='mb-12 font-medium text-md'>Top Selling Shoes</h3>
             <div className='flex flex-col gap-12 pb-8'>
                {
                    topSelling.map((shoe, index) => (
                        <div className='flex justify-between items-center' key={index}>
                            <div className='flex justify-start items-center gap-2'>
                                <img src={shoe.mainImage} alt={shoe.name} className='w-20 h-20 rounded-md object-cover'/>
                                <div>
                                    <h3 className='text-lg text-gray-700 font-medium'>{shoe.name}</h3>
                                    <p>Price: ₱ {shoe.price.toLocaleString()}</p>
                                </div>
                            </div>
                            <div>
                                <h2 className='text-2xl font-medium text-gray-700'>₱ {shoe.totalRevenue.toLocaleString()}</h2>
                                <p className='text-sm text-end text-gray-500'>{shoe.totalRevenue / shoe.price} pairs sold</p>
                            </div>
                        </div>
                    ))
                }
             </div>
          </div>
  )
}

export default AdminTopSelling
