import {useState, useEffect} from 'react'
import toast from 'react-hot-toast';
import API_URL from '../constants/api';
import { useNavigate, useParams } from 'react-router-dom';

function AdminEditProduct() {
    const {id} = useParams();
    const [imagePreviewUrls, setImagePreviewUrls] = useState([null, null, null, null, null]);
    const [imageFiles, setImageFiles] = useState([null, null, null, null, null]);
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);

    const [productDetails, setProductDetails] = useState({
        name: null,
        price: null,
        stock: null,
        description: null,
        type: 'casual',
        sex: 'men',
        tag: 'bestseller',
        isActive: true,
        mainImage: null,
        image1: null,
        image2: null,
        image3: null,
        image4: null,
    })

    const fetchProduct = async () => {
        const xhr = new XMLHttpRequest();
        try{
            xhr.open('GET', `${API_URL}product/product?id=${id}`, true);
            xhr.send();
            xhr.onload = () => {
                if (xhr.status === 200) {
                    let {data} = JSON.parse(xhr.responseText);
                    console.log(data)
                    setProductDetails({
                        name: data.name,
                        price: data.price.toString(),
                        stock: data.stock.toString(),
                        description: data.description,
                        type: data.type,
                        tag: data.tag,
                        mainImage: data.mainImage,
                        image1: data.image1,
                        image2: data.image2,
                        image3: data.image3,
                        image4: data.image4,
                    })

                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        toast.loading("Updating Product...")
        let errorLogs = [];
        
        if(!productDetails.name || productDetails.name.trim() == ""){ errorLogs.push({
            field: 'name',
            message: 'Name is required'
        }) }
        if(!productDetails.price || productDetails.price.trim() == ""){ errorLogs.push({
            field: 'price',
            message: 'Price is required'
        }) }

        if(!productDetails.stock || productDetails.stock.trim() == ""){ errorLogs.push({
            field: 'stock',
            message: 'Stock is required'
        }) }

        if(!productDetails.description || productDetails.description.trim() == ""){ errorLogs.push({
            field: 'description',
            message: 'Description is required'
        }) }

        if(errorLogs.length > 0){
            setError(errorLogs);
            toast.dismiss();
            setLoading(false);
            console.log(errorLogs)
            toast.error('Please fill in all required fields')
            return;
        }
        try{
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', `${API_URL}product/update`, true);
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify({
                id: id,
                name: productDetails.name,
                price: parseInt(productDetails.price),
                stock: parseInt(productDetails.stock),
                description: productDetails.description,
                type: productDetails.type,
                tag: productDetails.tag,
                sex: productDetails.sex
            })); // Stringify the productDetails object

            xhr.onload = () => {
                if (xhr.status === 200) {
                    toast.dismiss()
                    toast.success('Product updated successfully')
                    setLoading(false);
                }
            }

        } catch (error) {
            console.log(error)
            setLoading(false);
            toast.error('An error occured')
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [id])


    const navigate = useNavigate()

    return (
        <div className='p-8 mx-24'>
        <div className='flex justify-between shadow-sm bg-white p-4 rounded-md'>
            <h2 className='font-medium font-sans text-lg'>Edit Product</h2>
            <button className='bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-sm text-xs' onClick={()=> navigate('/admin/products')}>Go Back</button>
        </div>
            <div className='flex gap-8 shadow-sm bg-white p-4 rounded-md mt-8 justify-center'>
                <div className='flex flex-col mb-8 w-1/5 gap-4 '>
                    <img src={productDetails?.mainImage} alt="Preview" className="object-contain h-48 w-full" />
                    <img src={productDetails?.image1} alt="Preview" className="object-contain h-48 w-full" />
                    <img src={productDetails?.image2} alt="Preview" className="object-contain h-48 w-full" />
                    <img src={productDetails?.image3} alt="Preview" className="object-contain h-48 w-full" />
                    <img src={productDetails?.image4} alt="Preview" className="object-contain h-48 w-full" />
                </div>
                <div className='flex flex-col w-2/5'>
                    <label className='font-medium my-2 text-sm'>Product Name</label>
                    <h2 className='text-2xl font-medium'>{productDetails?.name}</h2>
                    <label className='font-medium my-2 text-sm'>Price</label>
                    <input value={productDetails?.price} type="number" placeholder="Price" onChange={(e)=> setProductDetails({...productDetails, price: e.target.value})} className={`border ${errors.find(error => error.field === 'price') ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md mb-4`} />
                    <label className='font-medium my-2 text-sm'>Stock</label>
                    <input value={productDetails?.stock} type="number" placeholder="Stock" onChange={(e)=> setProductDetails({...productDetails, stock: e.target.value})} className={`border ${errors.find(error => error.field === 'stock') ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md mb-4`} />
                    <label className='font-medium my-2 text-sm'>Description</label>
                    <textarea value={productDetails?.description} placeholder="Description" onChange={(e)=> setProductDetails({...productDetails, description: e.target.value})} className={`border ${errors.find(error => error.field === 'description') ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md mb-4 h-52 resize-none`} />
                    <label className='font-medium my-2 text-sm'>Shoe Type</label>
                    <select value={productDetails?.type} className='border border-gray-300 p-2 rounded-md mb-4' onChange={(e)=> setProductDetails({...productDetails, type: e.target.value})}>
                        <option value="casual">Casual</option>
                        <option value="basketball">Basketball</option>
                        <option value="skateboard">Skateboard</option>
                        <option value="running">Running</option>
                    </select>
                    <label className='font-medium my-2 text-sm'>Gender</label>
                    <select value={productDetails?.sex} className='border border-gray-300 p-2 rounded-md mb-4' onChange={(e)=> setProductDetails({...productDetails, sex: e.target.value})}>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kids</option>
                    </select>
                    <label className='font-medium my-2 text-sm'>Tag</label>
                    <select value={productDetails?.tag} className='border border-gray-300 p-2 rounded-md mb-4' onChange={(e)=> setProductDetails({...productDetails, tag: e.target.value})}>
                        <option value="bestseller">Best Seller</option>
                        <option value="featured">Featured</option>
                        <option value="sale">Sale</option>
                        <option value="new">New</option>
                    </select>
                    <button onClick={handleSubmit} className='bg-black mb-4 text-white p-4 rounded-md hover:bg-gray-200 hover:text-black ease-linear duration-100' disabled={loading}>
                        Submit Changes
                    </button>
                    <button onClick={()=> navigate('/admin/products')} className='bg-white border-black border text-black p-4 rounded-md hover:bg-gray-200 hover:text-black ease-linear duration-100' disabled={loading}>
                        Cancel
                    </button>
                </div>

            </div>
        </div>
        )
    }

export default AdminEditProduct
