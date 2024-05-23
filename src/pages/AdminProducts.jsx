import { useState, useEffect } from "react"
import API_URL from "../constants/api"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function AdminProducts() {

    const [search, setSearch] = useState(null)
    const [sort, setSort] = useState(null)
    const [type, setType] = useState(null)
    const [gender, setGender] = useState(null)
    const [tag, setTag] = useState(null)

    const [deleteModal, setDeleteModal] = useState(false);
    const [productToBeDeleted, setProductToBeDeleted] = useState({
        id: null,
        name: null
    });

    const [products, setProducts] = useState([])

    const navigate = useNavigate()

    const fetchProducts = async () => {
        const xhr = new XMLHttpRequest();
        try{
            let url = `${API_URL}product/products-query?admin=true&`;

            if(tag) url += `tag=${tag}&`;
            if(type) url += `type=${type}&`;
            if(gender) url += `sex=${gender}&`;
            if(sort) url += `sort=${sort}&`;
            if(search) url += `search=${search}&`;

            if(url.endsWith('&')) {
                url = url.slice(0, -1);
            }

            xhr.open('GET', url, true);
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            xhr.send();
            xhr.onload = () => {
                if (xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    setProducts(data.data);
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    
    //sort products based on sort state
    const sortProducts = () => {
        let tempProd = [...products]
        switch(sort) {
            case 'price-asc':
                return setProducts(tempProd.sort((a, b) => a.price - b.price));
            case 'price-desc':
                return setProducts(tempProd.sort((a, b) => b.price - a.price));
            case 'name-asc':
                return setProducts(tempProd.sort((a, b) => a.name.localeCompare(b.name)));
            case 'name-desc':
                return setProducts(tempProd.sort((a, b) => b.name.localeCompare(a.name)));
        }
    }

    useEffect(() => {
        sortProducts();
    }, [sort])

    useEffect(()=> {
        fetchProducts();
    }, [search, type, gender, tag])

  return (
    <div className='p-8 mx-24'>
      <div className='flex justify-between shadow-sm bg-white p-4 rounded-md'>
        <h2 className='font-medium font-sans text-lg'>Products</h2>
        <div className='flex items-center gap-2 text-gray-600'>
            <button className='bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-sm text-xs' onClick={() => navigate('/admin/add-product')}>Add Product</button>     
        </div>
      </div>
        <div className="bg-white rounded-sm p-2 my-4 shadow-md">
                <div className="flex justify-between items-center gap-2 p-2 ">
                        <select name="tags" id="tags" className='w-1/5 border border-gray-300 p-1 rounded-md' onChange={(e) => setTag(e.target.value === 'all' ? null : e.target.value)}>
                            <option value="all">All Tags</option>
                            <option value="featured">Featured</option>
                            <option value="bestseller">Best Seller</option>
                            <option value="sale">Sale</option>
                            <option value="new">New</option>
                        </select>
                        <select name="gender" id="gender" className='w-1/5 border border-gray-300 p-1 rounded-md' onChange={(e) => setGender(e.target.value === 'all' ? null : e.target.value)}>
                            <option value="all">All Genders</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kid">Kids</option>
                        </select>
                        <select name="type" id="type" className='w-1/5 border border-gray-300 p-1 rounded-md' onChange={(e) => setType(e.target.value === 'all' ? null : e.target.value)}>
                            <option value="all">All Types</option>
                            <option value="casual">Casual</option>
                            <option value="basketball">Basketball</option>
                            <option value="skateboard">Skateboard</option>
                            <option value="running">Running</option>
                        </select>
                        <select name="sort" id="sort" className='w-1/5 border border-gray-300 p-1 rounded-md' onChange={(e) => setSort(e.target.value === 'all' ? null : e.target.value)}>
                            <option value="all">Sort by</option>
                            <option value="price-asc">Price - Asc</option>
                            <option value="price-desc">Price - Desc</option>
                            <option value="name-asc">Name - Asc</option>
                            <option value="name-desc">Name - Desc</option>
                        </select>
                        <input type="text" placeholder="Search Products" className='w-1/5 border border-gray-300 p-2 rounded-md' onChange={(e) => e.target.value !== "" ? setSearch(e.target.value) : setSearch(null)}/>                    </div>
                </div>
      <div>
        <div className="relative overflow-hidden shadow-md rounded-lg mt-4">

            <table className="table-fixed w-full text-left">
                <thead className="uppercase bg-white text-gray-700 py-8">
                    <tr>
                        <td className="py-4  text-center  p-4">Image</td>
                        <td className="py-4  text-center  p-4">Name</td>
                        <td className="py-4  text-center  p-4">Price</td>
                        <td className="py-4  text-center  p-4">Stock</td>
                        <td className="py-4  text-center  p-4">Type</td>
                        <td className="py-4  text-center  p-4">Gender</td>
                        <td className="py-4  text-center  p-4">Tag</td>
                        <td className="py-4  text-center  p-4">Actions</td>
                    </tr>
                </thead>
                <tbody className="bg-white text-gray-500">
                    {
                        products.map((product, index) => (
                            <tr key={index} className="hover:bg-gray-100" >
                                <td className="py-4  text-center flex items-center justify-center  p-4">
                                    <img src={product.mainImage} alt="image" className="object-cover h-28 w-28 rounded-sm"/>
                                </td>
                                <td className="py-4  text-center  p-4 text-lg">{product.name}</td>
                                <td className="py-4  text-center  p-4">₱ {product.price}</td>
                                <td className="py-4  text-center  p-4">{product.stock}</td>
                                <td className="py-4  text-center  p-4">{product.type}</td>
                                <td className="py-4  text-center  p-4">{product.sex}</td>
                                <td className="py-4  text-center  p-4">{product.tag}</td>
                                <td className="py-4  text-center  p-4">
                                    <button className="text-white px-3 py-2 rounded-sm text-xs m-1 hover:scale-110" onClick={()=>navigate(`/admin/edit-product/${product._id}`)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="#1f9eff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"/></g></svg>
                                    </button>
                                    <button className="text-white px-3 py-2 rounded-sm text-xs m-2 hover:scale-110" onClick={()=> {
                                        setProductToBeDeleted({
                                            id: product._id,
                                            name: product.name
                                        });
                                        setDeleteModal(true);
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="#ff6161" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {products.length === 0 && <div className="text-center p-12">No products found</div>}
        </div>
      </div>
        {
                deleteModal && (
                    <div className='w-screen h-screen z-50 bg-black bg-opacity-50 fixed top-0 right-0 flex justify-center items-center'>
                        <div className='bg-white rounded-md p-8 w-3/12 flex flex-col'>
                            <h2 className="font-medium text-xl mb-4">You are deleting a Product</h2>
                            <div className="text-lg mb-4">
                                <p>Are you sure you want to delete <b>{productToBeDeleted.name}</b>?</p>
                            </div>
                            <div className='flex gap-4 mt-4 justify-end'>
                                <button className='bg-black text-white p-2 rounded-md w-24' onClick={() => {
                                    toast.loading('Deleting Product')
                                    const xhr = new XMLHttpRequest();
                                    xhr.open('PUT', `${API_URL}product/delete`, true);
                                    xhr.setRequestHeader('Content-Type', 'application/json');
                                    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                                    xhr.send(JSON.stringify({
                                        id: productToBeDeleted.id
                                    }));
                                    xhr.onload = () => {
                                        if(xhr.status === 200){
                                            toast.dismiss();
                                            toast.success('Product deleted successfully');
                                            fetchProducts();
                                            setDeleteModal(false);
                                        }
                                    }
                                }}>Yes</button>
                                <button className='bg-red-500 text-white p-2 rounded-md w-24' onClick={() => setDeleteModal(false)}>No</button>
                            </div>
                        </div>
                    </div>
                )
        }
    </div>
  )
}

export default AdminProducts
