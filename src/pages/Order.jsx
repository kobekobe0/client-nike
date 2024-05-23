import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import timeAgo from "../constants/timeAgo";
import API_URL from "../constants/api";
import toast from "react-hot-toast";

const UserInitials = ({ username, name:nameSplit, email }) => {
  return (
    <div className="flex items-center">
        <div className="bg-gray-300 text-2xl mr-2 text-white w-8 h-8 rounded-full flex items-center justify-center p-8">
         {nameSplit?.split(' ').map(name => name[0]).join('').toUpperCase()}
        </div>
        <div>
            <h2 className="text-lg">{nameSplit}</h2>
            <h2 className="text-sm text-gray-600">{username}</h2>
            <p className="text-gray-500">{email}</p>
        </div>
    </div>

  );
};

const ConfirmModal = ({show, setShow, onConfirm, action, changeStatus, order}) => {
    const handleChangeStatus = () => {
        if(action == "CANCEL") {
            changeStatus(order._id, 'cancelled')
        } else {
            changeStatus(order._id, 'approved')
        }
    }
    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${show ? 'block' : 'hidden'}`}>
            <div className="bg-white p-8 rounded-md shadow-md flex flex-col gap-4">
                <h1 className="text-xl font-medium">Confirmation</h1>
                <h2 className="text-lg mb-8">Are you sure you want to {action} this order?</h2>
                <div className="flex justify-end gap-4">
                    <button className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500" onClick={()=>{handleChangeStatus(); setShow(false)}}>Yes</button>
                    <button className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={()=>setShow(false)}>No</button>
                </div>
            </div>
        </div>
    )
}

const OrderCard = ({order, status,changeStatus}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [action, setAction] = useState(null)
    const [showModal, setShowModal] = useState(false)
    return (
        <div className="rounded-sm p-8 my-4 shadow-md flex flex-col cursor-pointer hover:bg-gray-100" >
            <div className="flex justify-between" onClick={()=>setShowDetails(!showDetails)}>
                <UserInitials {...order.client}/>
                <div className="flex flex-col items-end justify-between">
                    <h2 className="text-sm font-medium">{order.paymentMethod}</h2>
                    <p className="text-sm text-gray-500">{timeAgo(order?.createdAt)}</p>
                    <p className="text-sm text-gray-500">{order.products.length} items</p>
                </div>
            </div>
            {
                showDetails && (
                    <div className="flex flex-col gap-2 mt-8 ease-in-out duration-100">
                        <div className="mb-4">
                            <h2 className="text-sm font-medium">Address</h2>
                            <p className="text-sm text-gray-500">{order.address.street}, {order.address.number}, {order.address.barangay}, {order.address.municipality}, {order.address.city}, {order.address.zipCode}</p>
                        </div>
                        {order.products.map((product, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    <img src={product.id.mainImage} alt={product.id.name} className="w-16 h-16 object-cover"/>
                                    <div>
                                        <h2 className="text-sm font-medium">{product.id.name}</h2>
                                        <p className="text-sm text-gray-500">Size: {product.size}</p>
                                        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                                    </div>
                                </div>
                                <h2 className="text-sm font-medium">₱{product.id.price * product.quantity}</h2>
                            </div>
                        ))}
                        <hr />
                        <div className="flex justify-end">
                            <h2 className="text-sm font-medium">Total: ₱{order.products.reduce((acc, product) => acc + product.id.price * product.quantity, 0)}</h2>
                        </div>
                        <div className="flex justify-end gap-4 mt-2">
                            {status == "pending" && (
                                <>
                                    <button onClick={()=> {
                                        setShowModal(true);
                                        setAction("CANCEL")
                                    }} className="border border-red-400 text-red-400 px-4 py-2 hover:bg-red-400 hover:text-white rounded-md">Cancel</button>
                                    <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500" onClick={()=> {
                                            setShowModal(true);
                                            setAction("SHIP OUT")
                                        }
                                    }>Ship out</button>
                                </>
                            )}

                            {status == "approved" && (
                                <>
                                    <button className="border border-red-400 text-red-400 px-4 py-2 hover:bg-red-400 hover:text-white rounded-md" onClick={() => {
                                        setShowModal(true)
                                        setAction("CANCEL")
                                    }}>Cancel</button>
                                </>
                            )}

                            
                        </div>
                    </div>
                )
            }
            {
                showModal && <ConfirmModal order={order} show={showModal} changeStatus={changeStatus} setShow={setShowModal} onConfirm={()=>console.log('confirmed')} action={action}/>
            }
        </div>
    )
}

const Order = () => {
    const [status, setStatus] = useState('pending')
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const fetchOrders = async () => {
        setLoading(true)
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API_URL}order/admin?status=${status}`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        xhr.send();
        xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
                let {data} = JSON.parse(xhr.responseText)
                setOrders(data)
                setLoading(false)
            }
        }
    }

    const approveOrder = async (id, stat) => {
        toast.loading('Approving order...')
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${API_URL}order/status?id=${id}&status=${stat}`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        xhr.send();
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                toast.dismiss()
                toast.success('Order approved successfully')
                fetchOrders()
                
            } else if(xhr.readyState === 4 && xhr.status !== 200) {
                toast.dismiss()
                toast.error('Failed to approve order')
            }
        }
    }

    useEffect(() => {
        fetchOrders()
    },[status])

    return (
    <div className='p-8 mx-24'>
      <div className='flex justify-between shadow-sm bg-white p-4 rounded-md'>
        <h2 className='font-medium font-sans text-lg'>Orders</h2>
      </div>
      <div className="bg-white rounded-sm p-2 my-4 shadow-md">
                <div className="flex justify-end items-center gap-2 p-2 ">
                        <label htmlFor="status">Status: </label>
                        <select name="status" id="status" className='w-1/5 border text-xl border-gray-300 p-1 rounded-md' onChange={(e) => setStatus(e.target.value)}>
                            <option value="pending">To Pack</option>
                            <option value="approved">To Receive</option>
                            <option value="completed">Received</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

        <div className="bg-white rounded-sm px-8 py-4 my-4 shadow-md">
            {orders.length == 0 && (
                <div className="flex justify-center items-center h-64">
                    <h1 className="text-2xl text-gray-500">No orders to show</h1>
                </div>
            )}
            {
                loading ? (
                    <div className="flex justify-center items-center h-64">
                        <h1 className="text-2xl text-gray-500">Loading...</h1>
                    </div>
                ) : orders.map((order, index) => (
                <OrderCard key={index} order={order} status={status} changeStatus={approveOrder}/>
                ))
            }
        </div>

      </div>
    );
}

    export default Order;