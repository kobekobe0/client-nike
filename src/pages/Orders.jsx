import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API_URL from "../constants/api";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import timeAgo from "../constants/timeAgo";


// const orders = [
//           {
//             "_id": "664629871ff54b2b2ea40b0c",
//             "client": {
//                 "_id": "662b1a6f1d7593069a351e0b",
//                 "name": "client test 1",
//                 "email": "user@email.com"
//             },
//             "products": [
//                 {
//                     "id": {
//                         "_id": "663c99f8ce5e394fb660e685",
//                         "name": "Nike SB Chron 2",
//                         "price": 2999,
//                         "mainImage": "http://localhost:4000/images/mainImages/Nike%20SB%20Chron%202.webp"
//                     },
//                     "quantity": 3,
//                     "size": "11",
//                     "_id": "664629871ff54b2b2ea40b0d"
//                 },
//                 {
//                     "id": {
//                         "_id": "663c9a38ce5e394fb660e687",
//                         "name": "NIke SB Force 58",
//                         "price": 2999,
//                         "mainImage": "http://localhost:4000/images/mainImages/NIke%20SB%20Force%2058.webp"
//                     },
//                     "quantity": 2,
//                     "size": "9",
//                     "_id": "664629871ff54b2b2ea40b0e"
//                 },
//                 {
//                     "id": {
//                         "_id": "663c9812ce5e394fb660e671",
//                         "name": "Nike React Phantom",
//                         "price": 2999,
//                         "mainImage": "http://localhost:4000/images/mainImages/Nike%20React%20Phantom.webp"
//                     },
//                     "quantity": 1,
//                     "size": "9.5",
//                     "_id": "664629871ff54b2b2ea40b0f"
//                 }
//             ],
//             "status": "pending",
//             "updatedAt": null,
//             "address": {
//                 "street": "123123",
//                 "number": "12312312",
//                 "city": "12312",
//                 "municipality": "3123123",
//                 "barangay": "12312",
//                 "zipCode": "312312321",
//                 "_id": "664629871ff54b2b2ea40b10"
//             },
//             "paymentMethod": "Paypal",
//             "createdAt": "2024-05-16T15:43:03.682Z",
//             "__v": 0
//         },
//         {
//             "_id": "664629f51ff54b2b2ea40b3b",
//             "client": {
//                 "_id": "662b1a6f1d7593069a351e0b",
//                 "name": "client test 1",
//                 "email": "user@email.com"
//             },
//             "products": [
//                 {
//                     "id": {
//                         "_id": "663c99f8ce5e394fb660e685",
//                         "name": "Nike SB Chron 2",
//                         "price": 2999,
//                         "mainImage": "http://localhost:4000/images/mainImages/Nike%20SB%20Chron%202.webp"
//                     },
//                     "quantity": 1,
//                     "size": "7.5",
//                     "_id": "664629f51ff54b2b2ea40b3c"
//                 }
//             ],
//             "status": "pending",
//             "updatedAt": null,
//             "address": {
//                 "street": "weqweqw",
//                 "number": "eqweqwe",
//                 "city": "qweqwe",
//                 "municipality": "qweqwe",
//                 "barangay": "qweweqwe",
//                 "zipCode": "q2eq",
//                 "_id": "664629f51ff54b2b2ea40b3d"
//             },
//             "paymentMethod": "COD",
//             "createdAt": "2024-05-16T15:44:53.250Z",
//             "__v": 0
//         },
//         {
//             "_id": "66462bc0da67c77ffbc97c80",
//             "client": {
//                 "_id": "662b1a6f1d7593069a351e0b",
//                 "name": "client test 1",
//                 "email": "user@email.com"
//             },
//             "products": [
//                 {
//                     "id": {
//                         "_id": "663c99f8ce5e394fb660e685",
//                         "name": "Nike SB Chron 2",
//                         "price": 2999,
//                         "mainImage": "http://localhost:4000/images/mainImages/Nike%20SB%20Chron%202.webp"
//                     },
//                     "quantity": 1,
//                     "size": "7.5",
//                     "_id": "66462bc0da67c77ffbc97c81"
//                 }
//             ],
//             "status": "pending",
//             "updatedAt": null,
//             "address": {
//                 "street": "231231",
//                 "number": "23123123",
//                 "city": "12312",
//                 "municipality": "3123123",
//                 "barangay": "12312",
//                 "zipCode": "3123123",
//                 "_id": "66462bc0da67c77ffbc97c82"
//             },
//             "paymentMethod": "COD",
//             "createdAt": "2024-05-16T15:52:32.588Z",
//             "__v": 0
//         },
// ]


const UserInitials = ({ username }) => {
    const [profile, setProfile] = useState({});
    //const [initials, setInitials] = useState('');

  const fetchProfile = async () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}client/get-client`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        console.log(data.data)
        setProfile(data.data);
      }
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex items-center w-3/12 justify-center gap-8 mt-8">
        <div className="bg-gray-300 text-3xl text-white w-8 h-8 rounded-full flex items-center justify-center p-12">
         {profile?.name?.split(' ').map(name => name[0]).join('').toUpperCase()}
        </div>
        <div>
            <h2 className="text-2xl">{profile?.name}</h2>
            <h2 className="text-md text-gray-600">{profile?.username}</h2>
            <p className="text-gray-500">{profile?.email}</p>
        </div>
    </div>

  );
};

const OrderCard = ({order, handleCancel, handleComplete}) => {
    return (
        <div className="border border-gray-100 bg-white rounded-md p-4 my-4 shadow-md w-full md:w-1/2 lg:w-3/5">
            <div className="flex flex-col justify-end items-end">
                <h2 className="text-sm font-normal text-gray-600">{timeAgo(order?.createdAt)}</h2>
                <p className="text-sm text-gray-500">{order.paymentMethod}</p>
            </div>
            <div className="mt-4">
                {order.products.map(product => (
                    <div className="flex items-center justify-between mt-2" key={product.id.mainImage}>
                        <div className="flex items-center gap-4">
                            <img src={product.id.mainImage} alt="" className="w-20 h-20 object-cover"/>
                            <div>
                                <h2 className="text-md font-medium">{product.id.name} <span className="text-xs font-normal">x {product.quantity}</span></h2>
                                <p className="text-sm">Size: {product.size}</p>
                            </div>
                        </div>
                        <h2 className="text-md font-medium">₱{product.id.price}</h2>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-end items-center">
                {
                    handleCancel && <button className="bg-gray-400 px-4 text-sm py-1 rounded-full text-white hover:bg-red-500 ease-in-out duration-300 mx-2" onClick={() => handleCancel(order._id)}>Cancel</button>
                }
                {
                    handleComplete && <button className="bg-gray-400 px-4 text-sm py-1 rounded-full text-white hover:bg-green-500 ease-in-out duration-300 mx-2" onClick={() => handleComplete(order._id)}>Received</button>
                }
                <h2>Total: <span className="font-medium">
                    ₱ {
                    order.products.reduce((acc, product) => acc + (product.id.price * product.quantity), 0)    
                }
                    </span></h2>
            </div>
        </div>
    );
}

const OrderContents = () => {
    const [orders, setOrders] = useState([]);
    useEffect(()=> {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API_URL}order/client?status=pending`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        xhr.send();
        xhr.onload = () => {
            if(xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                setOrders(data.data);
            }
        }
    },[])

    if(orders.length === 0){
        return (
            <div className="flex w-full flex-col justify-center items-center h-64">
                <h2 className="text-2xl font-medium">No Pending Orders Yet</h2>
            </div>
        );
    }

    const handleCancelOrder = (orderId) => {
        toast.loading('Cancelling Order');
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${API_URL}order/cancel?id=${orderId}`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            status: 'cancelled'
        }));
        xhr.onload = () => {
            if(xhr.status === 200 || xhr.status === 201){
                toast.dismiss();
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                toast.success('Order Cancelled Successfully');
                setOrders(orders.filter(order => order._id !== orderId));
            }
        }
    }

    return (
        <div className="flex w-full flex-col justify-center items-center">
        {orders.map(order => (
            <OrderCard order={order} handleCancel={handleCancelOrder}/>
        ))}
        </div>
    );
}

const ApprovedOrderContents = () => {
    const [orders, setOrders] = useState([]);
    useEffect(()=> {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API_URL}order/client?status=approved`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        xhr.send();
        xhr.onload = () => {
            if(xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                setOrders(data.data);
            }
        }
    },[])

    const handleCompleteOrder = (orderId) => {
        toast.loading('Completing Order');
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${API_URL}order/status?id=${orderId}&status=completed`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            if(xhr.status === 200 || xhr.status === 201){
                toast.dismiss();
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                toast.success('Order Completed Successfully');
                setOrders(orders.filter(order => order._id !== orderId));
            } else {
                toast.dismiss();
                toast.error('An error occurred');
            }
        }
        xhr.send();
    }

    if(orders.length === 0){
        return (
            <div className="flex w-full flex-col justify-center items-center my-24 min-h-64">
                <h2 className="text-2xl font-medium">No Approved Orders Yet</h2>
            </div>
        );
    }
    return (
        <div className="flex w-full flex-col justify-center items-center">
        {orders.map(order => (
            <OrderCard order={order} key={order._id} handleComplete={handleCompleteOrder}/>
        ))}
        </div>
    );

}

const CompletedOrderContents = () => {
    const [orders, setOrders] = useState([]);
    useEffect(()=> {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API_URL}order/client?status=completed`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        xhr.send();
        xhr.onload = () => {
            if(xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                setOrders(data.data);
            }
        }
    },[])

    if(orders.length === 0){
        return (
            <div className="flex w-full flex-col justify-center items-center my-24 min-h-64">
                <h2 className="text-2xl font-medium">No Completed Orders Yet</h2>
            </div>
        );
    }
    return (
        <div className="flex w-full flex-col justify-center items-center">
        {orders.map(order => (
            <OrderCard order={order} key={order._id}/>
        ))}
        </div>
    );
}

const AccountSettings = () => {
    const [details, setDetails] = useState({
        name: '',
        username: '',
        email: ''
    });

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const fetchProfile = async () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API_URL}client/get-client`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        xhr.send();
        xhr.onload = () => {
            if(xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                setDetails(data.data);
            }
        }
    }

    useEffect(() => {
        fetchProfile();
    },[]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDetails({
            ...details,
            [name]: value
        });
    }

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setPassword({
            ...password,
            [name]: value
        });
    }

    const handleSaveChanges = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${API_URL}client/update-client`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(details));
        xhr.onload = () => {
            if(xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                toast.success(data.message);
            }
        }
    }

    const handlePasswordSave = () => {
        if(password.newPassword !== password.confirmPassword){
            toast.error('Passwords do not match');
            return;
        }
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${API_URL}client/change-password`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            password: password.newPassword,
            oldPassword: password.currentPassword
        }));
        xhr.onload = () => {
            if(xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                toast.success(data.message);
            } else {
                let data = JSON.parse(xhr.responseText);
                toast.error(data.message);
            }
        }
    }

    return (
        <div className='flex justify-center shadow-sm p-4 rounded-md mt-4 gap-4 w-full'>
            <div className='flex gap-8 p-8 bg-white shadow-md'>
                <div className='flex flex-col'>
                    <h3 className='font-medium text-md mb-4'>Change Profile Details</h3>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm text-gray-600' htmlFor="name">Name</label>
                        <input onChange={handleInputChange} value={details.name} className='p-4 w-96 border mb-4 border-gray-600 rounded-md' type="text" name="name" id="name" />
                        <label  className='mb-2 text-sm text-gray-600' htmlFor="username">Username</label>
                        <input onChange={handleInputChange} value={details.username} className='p-4 border mb-4 border-gray-600 rounded-md' type="text" name="username" id="username" />
                        <label className='mb-2 text-sm text-gray-600' htmlFor="email">Email</label>
                        <input onChange={handleInputChange} value={details.email} className='p-4 border mb-4 border-gray-600 rounded-md' type="text" name="email" id="email" />
                        <button className='bg-black text-white p-4 mt-4 hover:bg-gray-500 duration-100 ease-in-out rounded-md' onClick={handleSaveChanges}>Save Changes</button>
                    </div>
                </div>
                <div>
                    <h3 className='font-medium text-md mb-4'>Change Password</h3>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm text-gray-600' htmlFor="currentPassword">Current Password</label>
                        <input onChange={handlePasswordChange} className='p-4 border mb-4 border-gray-600 rounded-md' type="password" name="currentPassword" id="currentPassword"/>
                        <label className='mb-2 text-sm text-gray-600' htmlFor="newPassword">New Password</label>
                        <input onChange={handlePasswordChange} className='p-4 border mb-4 border-gray-600 rounded-md' type="password" name="newPassword" id="newPassword" />
                        <label className='mb-2 text-sm text-gray-600' htmlFor="confirmPassword">Confirm New Password</label>
                        <input onChange={handlePasswordChange} className='p-4 border mb-4 border-gray-600 rounded-md' type="password" name="confirmPassword" id="confirmPassword"/>
                        <button className='bg-black text-white p-4 mt-4 hover:bg-gray-500 duration-100 ease-in-out rounded-md' onClick={handlePasswordSave}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );

}


const Orders = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <main>
      <Navbar />
      <section className="w-full flex items-center justify-center">
        <UserInitials />
      </section>
      <hr  className="mx-56 mt-8"/>
      <section className="flex justify-center mt-8 gap-8">
        <button
            className={`px-4 py-2 ${activeTab === 'orders' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab('orders')}
            >
            To Pack
        </button>
        <button
            className={`px-4 py-2 ${activeTab === 'approved' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab('approved')}
            >
            To Receive
        </button>
        <button
            className={`px-4 py-2 ${activeTab === 'history' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab('history')}
            >
            Received
        </button>
        <button
            className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab('settings')}
            >
            Account Settings
        </button>
      </section>
      <section className="bg-gray-200 h-full">
        {activeTab === 'orders' && <OrderContents />}
        {activeTab === 'approved' && <ApprovedOrderContents />}
        {activeTab === 'history' && <CompletedOrderContents />}
        {activeTab === 'settings' && <AccountSettings/>}
      </section>

        <Footer />
      
    </main>
  );
};
export default Orders;