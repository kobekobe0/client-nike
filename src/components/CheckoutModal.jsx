import { useState } from 'react';
import toast from 'react-hot-toast';
import API_URL from '../constants/api';
import { useNavigate } from 'react-router-dom';
const CheckoutModal = ({isOpen, setIsOpen, cartItems}) => {
  const [address, setAddress] = useState({
    street: '',
    number:'',
    city: '',
    municipality: '',
    barangay: '',
    zipCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const PAYMENT_METHODS = ["GCash", "Paypal", "Credit Card", "COD"];

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const closeModal = (e) => {
    if (e.target.id === "modal") {
      setIsOpen(false);
    }
  };

  const router = useNavigate()

    const handleCheckout = async () => {
        try{
            const xhr = new XMLHttpRequest();
            console.log("CART IDS: ", cartItems.map(item => item._id))
            console.log(address)
            toast.loading('Checking out...')
            xhr.open('POST', `${API_URL}order/create`, true);
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                products: cartItems.map(item => ({
                    id: item.product._id,
                    quantity: item.quantity,
                    size: item.size,
                })),
                cartIds: cartItems.map(item => item._id),
                address: address,
                paymentMethod: paymentMethod
            }));
            xhr.onload = () => {
                if(xhr.status === 200 || xhr.status === 201){
                    toast.dismiss();
                    let data = JSON.parse(xhr.responseText);
                    toast.success("Order Created Successfully");
                    setIsOpen(false);
                    console.log(data);
                    setTimeout(() => {
                        router(`/orders`)
                    }, 1000);
                }
                if(xhr.status === 400){
                    toast.dismiss()
                    toast.error(JSON.parse(xhr.responseText).error)
                }
            }

        } catch(error){
            toast.error(error.message)
        }
    
    }

  return (
    isOpen && (
        <div className='w-screen h-screen bg-black bg-opacity-50 absolute top-0 flex justify-center items-center'>
            <div className='bg-white rounded-md p-8 w-3/12 flex flex-col'>
                <div className='text-lg flex items-center justify-between font-medium mb-4'>
                    <h2>Checkout</h2>
                    <button onClick={()=>setIsOpen(false)} className=''>X</button>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-sm text-gray-500 mb-4'>Shipping Address</h2>
                        <label htmlFor="street" className='text-xs'>Street</label>
                        <input className='p-2 text-gray-700 border-gray-300 border rounded-md' type="text" name="street" placeholder="Street" onChange={handleAddressChange}/>
                        <label htmlFor="number" className='text-xs'>Number</label>
                        <input className='p-2 text-gray-700 border-gray-300 border rounded-md' type="text" name="number" placeholder="Number" onChange={handleAddressChange}/>
                        <label htmlFor="barangay" className='text-xs'>Barangay</label>
                        <input className='p-2 text-gray-700 border-gray-300 border rounded-md' type="text" name="barangay" placeholder="Barangay" onChange={handleAddressChange}/>
                        <label htmlFor="municipality" className='text-xs'>Municipality</label>
                        <input className='p-2 text-gray-700 border-gray-300 border rounded-md' type="text" name="municipality" placeholder="Municipality" onChange={handleAddressChange}/>
                        <label htmlFor="city" className='text-xs'>City</label>
                        <input className='p-2 text-gray-700 border-gray-300 border rounded-md' type="text" name="city" placeholder="City" onChange={handleAddressChange}/>
                        <label htmlFor="zipCode" className='text-xs'>Zip Code</label>
                        <input className='p-2 text-gray-700 border-gray-300 border rounded-md' type="text" name="zipCode" placeholder="Zip Code" onChange={handleAddressChange}/>

                    </div>
                    <div>
                        <h2 className='text-sm text-gray-500 mb-4 my-6'>Payment Method</h2>
                        <select value={paymentMethod} onChange={handlePaymentMethodChange} className='p-2 text-gray-700 border-gray-300 border rounded-md w-full'>
                            {
                                PAYMENT_METHODS.map((paymentMethod)=> (
                                    <option key={paymentMethod} value={paymentMethod}>{paymentMethod}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <button onClick={handleCheckout} className='bg-black text-white p-4 rounded-md mt-6 w-full'>Checkout</button>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
  );
};

export default CheckoutModal;