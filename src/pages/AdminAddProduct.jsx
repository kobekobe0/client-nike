import {useState} from 'react'
import toast from 'react-hot-toast';
import API_URL from '../constants/api';
import { useNavigate } from 'react-router-dom';

function AdminAddProduct() {

    const [imagePreviewUrls, setImagePreviewUrls] = useState([null, null, null, null, null]);
    const [imageFiles, setImageFiles] = useState([null, null, null, null, null]);
    const [loading, setLoading] = useState(false);


    const [productDetails, setProductDetails] = useState({
        name: null,
        price: null,
        stock: null,
        description: null,
        type: 'casual',
        sex: 'men',
        tag: 'bestseller',
        isActive: true,
    })

    const [errors, setError] = useState([]);

    const navigate = useNavigate()

    const handleImageChange = (e, index) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            let updatedUrls = [...imagePreviewUrls];
            updatedUrls[index] = reader.result;
            setImagePreviewUrls(updatedUrls);

            // Also update the imageFiles state with the original file object
            let updatedFiles = [...imageFiles];
            updatedFiles[index] = file;
            setImageFiles(updatedFiles);
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    const handleSubmit = () => {
        toast.loading('Adding product...')
        setLoading(true);
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


        if(imageFiles.filter(file => file !== null).length < 1){ 
            toast.error('Please upload five(5) images')
            errorLogs.push({
                field: 'images',
                message: 'Please upload five(5) images'
            })
        }

        if(errorLogs.length > 0){
            setError(errorLogs);
            toast.dismiss();
            setLoading(false);
            toast.error('Please fill in all required fields')
            return;
        }

        try{
            const xhr = new XMLHttpRequest();
            const formData = new FormData();

            formData.append('name', productDetails.name);
            formData.append('price', productDetails.price);
            formData.append('stock', productDetails.stock);
            formData.append('description', productDetails.description);
            formData.append('type', productDetails.type);
            formData.append('sex', productDetails.sex)
            formData.append('tag', productDetails.tag);

            imageFiles.forEach((url, index) => {
                if(index == 0){
                    formData.append('mainImage', url);
                } else {
                    formData.append(`image${index}`, url);
                }
            })

            xhr.open('POST', `${API_URL}product/create`, true);
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
            xhr.send(formData);

            xhr.onreadystatechange = function() {
                if(xhr.status == 201 || xhr.status == 200) {
                    toast.dismiss();
                    toast.success('Product added successfully');
                    setLoading(false);
                    navigate('/admin/products')
                    console.log(xhr.responseText)

                }
            }
        } catch (error){
            console.log(error)
            toast.dismiss();
            setLoading(false);
            toast.error(error.error)
        }
    }
    
    return (
        <div className='p-8 mx-24'>
        <div className='flex justify-between shadow-sm bg-white p-4 rounded-md'>
            <h2 className='font-medium font-sans text-lg'>Add Product</h2>
            <button className='bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-sm text-xs' onClick={()=> navigate('/admin/products')}>Go Back</button>
        </div>
            <div className='flex gap-8 shadow-sm bg-white p-4 rounded-md mt-8 justify-center'>
                <div className='flex flex-col mb-8 w-1/5 '>
                    {Array(5).fill().map((_, index) => (
                        <div key={index} className='my-2'>
                            <label className="w-full flex flex-col items-center px-4 mb-4 py-4 bg-white text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-gray-100">
                                <div className='flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm1-2h12l-3.75-5l-3 4L9 13zm-1 2V5z"/></svg>
                                    <span className="text-base leading-normal ml-2">
                                        {index === 0 ? 'Main Image' : `Image ${index + 1}`}
                                    </span>
                                    <input type='file' className="hidden" onChange={(e) => handleImageChange(e, index)} />
                                </div>

                                {imagePreviewUrls[index] && <img src={imagePreviewUrls[index]} alt="Preview" className="object-contain h-48 w-full" />}
                            </label>
                            
                        </div>
                    ))}
                </div>
                <div className='flex flex-col w-2/5'>
                    <label className='font-medium my-2 text-sm'>Product Name</label>
                <input type="text" placeholder="Name" onChange={(e)=> setProductDetails({...productDetails, name: e.target.value})} className={`border ${errors.find(error => error.field === 'name') ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md mb-4`} />
                <label className='font-medium my-2 text-sm'>Price</label>
                <input type="number" placeholder="Price" onChange={(e)=> setProductDetails({...productDetails, price: e.target.value})} className={`border ${errors.find(error => error.field === 'price') ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md mb-4`} />
                <label className='font-medium my-2 text-sm'>Stock</label>
                <input type="number" placeholder="Stock" onChange={(e)=> setProductDetails({...productDetails, stock: e.target.value})} className={`border ${errors.find(error => error.field === 'stock') ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md mb-4`} />
                <label className='font-medium my-2 text-sm'>Description</label>
                <textarea placeholder="Description" onChange={(e)=> setProductDetails({...productDetails, description: e.target.value})} className={`border ${errors.find(error => error.field === 'description') ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md mb-4 h-52 resize-none`} />
                    <label className='font-medium my-2 text-sm'>Shoe Type</label>
                    <select className='border border-gray-300 p-2 rounded-md mb-4' onChange={(e)=> setProductDetails({...productDetails, type: e.target.value})}>
                        <option value="casual">Casual</option>
                        <option value="basketball">Basketball</option>
                        <option value="skateboard">Skateboard</option>
                        <option value="running">Running</option>
                    </select>
                    <label className='font-medium my-2 text-sm'>Gender</label>
                    <select className='border border-gray-300 p-2 rounded-md mb-4' onChange={(e)=> setProductDetails({...productDetails, sex: e.target.value})}>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kids</option>
                    </select>
                    <label className='font-medium my-2 text-sm'>Tag</label>
                    <select className='border border-gray-300 p-2 rounded-md mb-4' onChange={(e)=> setProductDetails({...productDetails, tag: e.target.value})}>
                        <option value="bestseller">Best Seller</option>
                        <option value="featured">Featured</option>
                        <option value="sale">Sale</option>
                        <option value="new">New</option>
                    </select>
                    <button className='bg-black text-white p-4 rounded-md hover:bg-gray-200 hover:text-black ease-linear duration-100' onClick={handleSubmit} disabled={loading}>
                        Add Product
                    </button>
                </div>
            </div>

        </div>
        )
    }

export default AdminAddProduct
