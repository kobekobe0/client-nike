import { useNavigate } from "react-router-dom";
import useAuthContext from "../constants/checkAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API_URL from "../constants/api";

const sizes = ['7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13']

const ProductDetails = ({ product, currentImage, setCurrentImage, selectedSize, setSelectedSize }) => {
    const checkAuth = useAuthContext();
    const [auth, setAuth] = useState(false)
    const [role, setRole] = useState('')
    
    const navigate = useNavigate();
    const handleAddToCart = async () => {
        if(!selectedSize) {
            toast.error('Please select a size')
            return
        }
        const xhr = new XMLHttpRequest();
        if (!auth) {
            console.log('no auth')
            navigate('/signin')
            return
        }
        try{    
            toast.loading('Adding to cart...')
            xhr.open('POST', `${API_URL}cart/`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    toast.dismiss();
                    const res = JSON.parse(xhr.responseText);
                    console.log(res);
                    toast.success(res.message);
                }
            };
            xhr.send(JSON.stringify({
                product: product._id,
                size: selectedSize,
                quantity: 1
            }));
            
            
        } catch (error) {
            console.log(error)
            toast.error('An error occurred')
        }
    }

    const handleOrder = () => {
        if (!auth) {
            console.log('no auth')
            navigate('/signin')
        }
        console.log('auth')
    }

    useEffect(()=> {
        const {auth, role} = checkAuth();
        setAuth(auth)
        setRole(role)
    },[])
    return (
        <div className="w-full flex flex-col justify-center items-center mt-12 px-4 md:px-36">
            <div className="w-full flex flex-col md:flex-row justify-center gap-4">
                <div className="flex md:w-1/2 gap-4">
                        <ul className="flex flex-col  gap-4 w-full sm:w-2/5 justify-center sm:justify-start">
                            <li onMouseEnter={() => setCurrentImage(product.mainImage)}><img src={product.mainImage} alt="main" className="w-16 h-16 object-cover rounded-lg cursor-pointer"/></li>
                            <li onMouseEnter={() => setCurrentImage(product.image1)}><img src={product.image1} alt="main" className="w-16 h-16 object-cover rounded-lg cursor-pointer"/></li>
                            <li onMouseEnter={() => setCurrentImage(product.image2)}><img src={product.image2} alt="main" className="w-16 h-16 object-cover rounded-lg cursor-pointer"/></li>
                            <li onMouseEnter={() => setCurrentImage(product.image3)}><img src={product.image3} alt="main" className="w-16 h-16 object-cover rounded-lg cursor-pointer"/></li>
                            <li onMouseEnter={() => setCurrentImage(product.image4)}><img src={product.image4} alt="main" className="w-16 h-16 object-cover rounded-lg cursor-pointer"/></li>
                        </ul>
                        <div>
                            <img src={currentImage} alt="main" className="w-full rounded-lg" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 md:px-28">
                        <div>
                            <h2 className="text-3xl font-medium">{product.name}</h2>
                            <h3 className="text-lg font-medium text-gray-500">{product.sex}'s {product.type} shoes</h3>
                            <h3 className="text-md font-normal text-gray-800">Available Stock: {product.stock}</h3>
                            <h3 className="text-xl my-4">₱ {product.price}</h3>
                        </div>
                        <div className="mt-2">
                            <h3 className="my-4">Size</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {
                                    sizes.map(size => (
                                        <button key={size} className={`border border-gray-300 rounded-md p-2 ${selectedSize === size ? 'bg-black text-white' : ''}`} onClick={() => setSelectedSize(size)}>US {size}</button>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex flex-col mt-8 gap-6" >
                            <button onClick={() => handleAddToCart()} className="rounded-full bg-black text-white text-xl py-4 bg-opacity-90">
                                Add to cart
                            </button>

                            
                            <button onClick={()=> handleOrder()} className="rounded-full border bg-white text-black text-xl py-4 border-black">
                                Order
                            </button>
                        </div>
                        <div className="mt-8 text-lg text-justify">
                            <p>{product.description}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}

export default ProductDetails;