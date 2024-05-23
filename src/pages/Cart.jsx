import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {useState, useEffect} from "react";
import API_URL from "../constants/api";
import toast from "react-hot-toast";
import CheckoutModal from "../components/CheckoutModal";
import Footer from "../components/Footer";


const cartItemss = [
        {
            "_id": "6645ceb755fbc6ebfc5c3db0",
            "client": "662b1a6f1d7593069a351e0b",
            "product": {
                "_id": "663b8b99083f33c120272521",
                "name": "Cir Jordan 1",
                "price": 3669,
                "type": "casual",
                "sex": "men",
                "mainImage": "http://localhost:4000/images/mainImages/Air%20Jordan%201.webp"
            },
            "quantity": 4,
            "size": "9.5",
            "createdAt": "2024-05-16T09:15:35.925Z",
            "__v": 0
        },
        {
            "_id": "6645cf1461a5cece36ebaae8",
            "client": "662b1a6f1d7593069a351e0b",
            "product": {
                "_id": "663b8b99083f33c120272521",
                "name": "Cir Jordan 1",
                "price": 3669,
                "type": "casual",
                "sex": "men",
                "mainImage": "http://localhost:4000/images/mainImages/Air%20Jordan%201.webp"
            },
            "quantity": 2,
            "size": "9",
            "createdAt": "2024-05-16T09:17:08.083Z",
            "__v": 0
        },
        {
            "_id": "6645d1ea61a5cece36ebaaf6",
            "client": "662b1a6f1d7593069a351e0b",
            "product": {
                "_id": "663c99f8ce5e394fb660e685",
                "name": "Nike SB Chron 2",
                "price": 2999,
                "type": "skateboard",
                "sex": "men",
                "mainImage": "http://localhost:4000/images/mainImages/Nike%20SB%20Chron%202.webp"
            },
            "quantity": 8,
            "size": "8",
            "createdAt": "2024-05-16T09:29:14.842Z",
            "__v": 0
        },
]

const PAYMENT_METHODS = ["GCash", "Paypal", "Credit Card", "COD"]


const Cart = () => {
    
    const [cartItems, setCartItems] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const fetchCartItems = async () => {
        try{
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `${API_URL}cart`, true);
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            xhr.send();
            xhr.onload = () => {
                if(xhr.status === 200 || xhr.status === 201){
                    let data = JSON.parse(xhr.responseText);
                    console.log(data.data)
                    setCartItems(data.data)
                }
            }

        } catch(error){
            toast.error(error.message)
        }
    }

    const handleDelete = async (id) => {
        try{
            const xhr = new XMLHttpRequest();
            toast.loading('Deleting item...')
            xhr.open('DELETE', `${API_URL}cart?id=${id}`, true);
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            xhr.send();
            xhr.onload = () => {
                if(xhr.status === 200 || xhr.status === 201){
                    toast.dismiss();
                    let data = JSON.parse(xhr.responseText);
                    console.log(data.cartItem)
                    //filter out the deleted item
                    setCartItems(cartItems.filter(item => item._id !== id))
                    toast.success('Item deleted successfully')
                }
            }

        } catch(error){
            toast.error(error.message)
        }
    }

    const handleChangeQuantity = async (id, quantity) => {
        try{
            const xhr = new XMLHttpRequest();
            toast.loading('Updating quantity...')
            xhr.open('PUT', `${API_URL}cart?id=${id}`, true);
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({quantity}));
            xhr.onload = () => {
                if(xhr.status === 200 || xhr.status === 201){
                    toast.dismiss();
                    let data = JSON.parse(xhr.responseText);
                    console.log(data.cartItem)
                    //filter out the deleted item
                    setCartItems(cartItems.map(item => item._id === id ? {...item, quantity} : item))
                    toast.success('Quantity updated successfully')
                }
            }

        } catch(error){
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchCartItems()
    }, []);

    function numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }


    return (
        <main>
            <Navbar/>
                {
                    cartItems.length === 0 ? (
                        <div className="w-screen h-fit flex flex-col justify-center items-center mt-12">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 24 24"><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11.5v5m0-8.99l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"></path></svg>
                            <h1 className="text-4xl font-semibold mb-4">Your bag is empty</h1>
                            <p className="text-xl text-gray-600 mb-6">Looks like you haven't added any items to your bag yet. Start shopping to fill it up!</p>
                            <button 
                                onClick={() => navigate('/products')} 
                                className="px-12 py-4 bg-black text-white rounded hover:bg-gray-700"
                            >
                                Shop Now
                            </button>
                        </div>
                    ) : null
                }
            {
                cartItems.length !== 0 && (
                    <section className="w-screen flex justify-center mt-12 gap-8 px-4 md:px-96">
                <div className="w-7/12">
                    <h1>Bag</h1>
                    <div className="flex flex-col">
                        {
                            cartItems.map(item => (
                                <div key={item._id} className="w-full flex gap-4 my-4 justify-between bg-gray-100 p-4 rounded-lg">
                                    <div className="flex gap-4">
                                        <img src={item.product.mainImage} alt="main" className="w-36 h-36 object-cover rounded-lg"/>
                                        <div className="gap-1 flex flex-col font-medium text-gray-500 text-sm">
                                            <h2 className="text-xl font-medium text-gray-800">{item.product.name}</h2>
                                            <h3>{item.product.sex}'s {item.product.type} shoes</h3>
                                                <div className="flex w-full flex-col gap-2">
                                                    <h4 className="font-normal">Size: <span className="font-medium">{item.size}</span></h4>
                                                    <h4 className="font-normal">Quantity: <span>
                                                            <select defaultValue={item.quantity} className="font-normal text-black" onChange={(e)=> handleChangeQuantity(item._id, parseInt(e.target.value))}>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                            </select>
                                                        </span>
                                                    </h4>
                                                    <h4 className="font-normal">Available Stock: <span className="font-medium">{item.product.stock}</span></h4>
                                                    
                                                    <button className="hover:bg-red-100 w-fit " onClick={()=> handleDelete(item._id)}>
                                                        <img width="20" height="20" src="https://img.icons8.com/windows/32/737373/delete.png" alt="delete"/>
                                                    </button>

                                                </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <h3 className="text-md font-normal">₱ {numberWithCommas(item.product.price * item.quantity)}</h3>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="w-5/12 bg-white p-6 rounded-lg shadow-md h-fit">
                    <h1 className="text-2xl  mb-8">Summary</h1>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-6">Subtotal</h2>
                        {
                            cartItems.map(item => (
                                <div key={item._id} className="flex justify-between mb-2">
                                    <h3 className="text-gray-800 font-medium">{item.product.name} <span className="text-xs font-medium text-gray-500">{item.quantity}pc(s)</span></h3>
                                    <h3 className="text-gray-700">₱ {numberWithCommas(item.product.price * item.quantity)}</h3>
                                </div>
                            ))
                        }
                        <hr className="my-4 mt-12" />
                        <div className="flex justify-between">
                            <h3 className="text-xl font-semibold">Total</h3>
                            <h3 className="text-xl font-medium text-gray-700">₱ {numberWithCommas(cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0))}</h3>
                            
                        </div>
                        <button onClick={()=> setIsOpen(true)} className="bg-black text-white px-4 py-4 hover:bg-gray-600 ease-in-out duration-300 rounded-lg w-full mt-8">Proceed</button>
                    </div>
                </div>
            </section>
                )
            }
            
            <CheckoutModal isOpen={isOpen} setIsOpen={setIsOpen} cartItems={cartItems}/>
            
        </main>
    );
    }

    export default Cart;