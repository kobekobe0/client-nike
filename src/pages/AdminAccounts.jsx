import { useState, useEffect } from 'react'
import API_URL from '../constants/api'
import toast from 'react-hot-toast'

function AdminAccounts() {
    const [accounts, setAccounts] = useState([])
    const [search, setSearch] = useState(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const fetchAccounts = async () => {
        const xhr = new XMLHttpRequest();
        const searchQuery = search ? `?search=${search}` : '';
        xhr.open('GET', `${API_URL}admin/get-all-admins${searchQuery}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                setAccounts(JSON.parse(xhr.responseText).data);
            }
        }
        xhr.send();
    }

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value ? value : null);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleFormSubmit = async (event) => {
        if(formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if(formData.password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }
        
        toast.loading('Adding Admin Account...');
        event.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${API_URL}admin/add-admin`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        xhr.onreadystatechange = function() {
            if(xhr.status === 201) {
                setDrawerOpen(false);
                toast.dismiss();
                fetchAccounts();
                toast.success('Admin Account Added Successfully');
            }
        }
        xhr.send(JSON.stringify(formData));
        setDrawerOpen(false);
    }

    useEffect(() => {
        fetchAccounts()
    }, [])

    useEffect(() => {
        fetchAccounts()
    }, [search])

    return (
        <div className='p-8 mx-24'>
            <div className='flex justify-between shadow-sm bg-white p-4 rounded-md mb-4'>
                <h2 className='font-medium font-sans text-lg'>Accounts</h2>
                <div className='flex items-center gap-2 text-gray-600'>
                    <button 
                        className='bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-sm text-xs'
                        onClick={() => setDrawerOpen(true)}
                    >
                        Add Admin Account
                    </button>
                </div>
            </div>
            <div className='flex justify-end shadow-sm bg-white p-4 rounded-md items-center gap-4 mb-4'>
                <p className='text-sm text-gray-600'>Search: </p>
                <input 
                    type="text" 
                    placeholder='Search Account' 
                    className='border border-gray-400 p-2 w-1/5 rounded-md'
                    onChange={handleSearchChange}
                />
            </div>
            <div className='flex justify-between shadow-sm bg-white p-4 rounded-md mb-4'>
                <table className='table-auto w-full mt-4'>
                    <thead >
                        <tr >
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Username</th>
                            <th className='px-4 py-2'>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts?.map((admin, index) => (
                            <tr key={index} className={`text-center p-2 ${index % 2 === 0 ? 'bg-gray-200' : ''}`}>
                                <td className='border px-4 py-4 border-none'>{admin.name}</td>
                                <td className='border px-4 py-4 border-none'>{admin.username}</td>
                                <td className='border px-4 py-4 border-none'>{admin.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {drawerOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-8 rounded-md w-1/3'>
                        <h3 className='text-lg font-medium mb-4'>Add Admin Account</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Name</label>
                                <input 
                                    type='text' 
                                    name='name' 
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    className='w-full border border-gray-400 p-2 rounded-md'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Username</label>
                                <input 
                                    type='text' 
                                    name='username' 
                                    value={formData.username} 
                                    onChange={handleInputChange} 
                                    className='w-full border border-gray-400 p-2 rounded-md'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Email</label>
                                <input 
                                    type='email' 
                                    name='email' 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    className='w-full border border-gray-400 p-2 rounded-md'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Password</label>
                                <input 
                                    type='password' 
                                    name='password' 
                                    value={formData.password} 
                                    onChange={handleInputChange} 
                                    className='w-full border border-gray-400 p-2 rounded-md'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Confirm Password</label>
                                <input 
                                    type='password' 
                                    name='confirmPassword' 
                                    value={formData.confirmPassword} 
                                    onChange={handleInputChange} 
                                    className='w-full border border-gray-400 p-2 rounded-md'
                                    required
                                />
                            </div>
                            <div className='flex justify-end'>
                                <button 
                                    type='button' 
                                    onClick={() => setDrawerOpen(false)} 
                                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2'
                                >
                                    Cancel
                                </button>
                                <button 
                                    type='submit' 
                                    className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminAccounts
