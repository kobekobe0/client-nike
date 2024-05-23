import { useEffect, useState } from 'react'
import API_URL from "../constants/api";
import toast from 'react-hot-toast';

const data = {
        "username": "user2",
        "name": "user test 2",
        "email": "user@email.com",
        "role": "admin"
    }

const UserInitials = ({ name:nameSplit }) => {
  return (
        <div className="bg-gray-300 text-2xl mr-2 text-white w-16 h-16 rounded-full flex items-center justify-center p-16">
         {nameSplit?.split(' ').map(name => name[0]).join('').toUpperCase()}
        </div>

  );
};

function AdminProfile() {

    const [data, setProfile] = useState(null)
    
    const [newDetails, setNewDetails] = useState({
        name: '',
        username: '',
        email: ''
    })

    const [newPassword, setNewPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const fetchProfile = async () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', `${API_URL}admin/get-admin?id={}`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    setProfile(JSON.parse(xhr.responseText).data)
                    setNewDetails(JSON.parse(xhr.responseText).data)
                }
            }
        }
        xhr.send()
    }
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewDetails({
            ...newDetails,
            [name]: value
        });
    }

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setNewPassword({
            ...newPassword,
            [name]: value
        });
    }

    const saveDetails = async () => {
        toast.loading('Saving Changes...')
        const xhr = new XMLHttpRequest()
        xhr.open('PATCH', `${API_URL}admin/change-details`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    toast.dismiss()
                    console.log(JSON.parse(xhr.responseText))
                    toast.success('Changes Saved!')
                    fetchProfile()
                }
            }
        }
        xhr.send(JSON.stringify(newDetails))
    
    }

    const savePassword = async () => {
        if(newPassword.newPassword.length < 8) {
            return toast.error('Password must be at least 8 characters long!')
        }
        if(newPassword.newPassword !== newPassword.confirmPassword) {
            return toast.error('Passwords do not match!')
        }
        toast.loading('Saving Changes...')
        const xhr = new XMLHttpRequest()
        xhr.open('PATCH', `${API_URL}admin/change-password`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    toast.dismiss()
                    console.log(JSON.parse(xhr.responseText))
                    toast.success('Changes Saved!')
                    fetchProfile()
                }
            }

            if (xhr.status === 400) {
                toast.dismiss()
                toast.error('Incorrect Password!')
            }
        }
        xhr.send(JSON.stringify({
            password: newPassword.newPassword,
            oldPassword: newPassword.currentPassword
        }))
    
    }

    useEffect(()=> {
        fetchProfile()
    }, [])

  return (
    <div className='p-8 mx-44'>
        <div className='flex justify-between shadow-sm bg-white p-4 rounded-md'>
            <h2 className='font-medium font-sans text-lg'>Profile</h2>  
        </div>
        <div className='flex justify-center shadow-sm p-4 rounded-md mt-4 gap-4 mb-4'>
            <div className='w-1/3 bg-white rounded-e-md shadow-md items-center justify-center flex flex-col gap-4 p-4 py-16 h-fit'>
                <UserInitials name={data?.name}/>
                <div className='flex flex-col gap-4'>
                    <h2 className="text-3xl font-medium">{data?.name}</h2>
                    <p className="text-gray-500 text-md">{data?.email}</p>
                    <h2 className="text-md text-gray-600">{data?.username}</h2>
                </div>
            </div>
            <div className='flex flex-col w-2/3 p-8 bg-white shadow-md'>
                <div className='flex flex-col'>
                    <h3 className='font-medium text-md mb-4'>Change Profile Details</h3>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm text-gray-600' htmlFor="name">Name</label>
                        <input className='p-4 border mb-4 border-gray-600 rounded-md' type="text" name="name" id="name" value={newDetails.name} onChange={handleInputChange}/>
                        <label className='mb-2 text-sm text-gray-600' htmlFor="username">Username</label>
                        <input className='p-4 border mb-4 border-gray-600 rounded-md' type="text" name="username" id="username" value={newDetails.username} onChange={handleInputChange}/>
                        <label className='mb-2 text-sm text-gray-600' htmlFor="email">Email</label>
                        <input className='p-4 border mb-4 border-gray-600 rounded-md' type="text" name="email" id="email" value={newDetails.email} onChange={handleInputChange}/>
                        <button className='bg-black text-white p-4 mt-4 hover:bg-gray-500 duration-100 ease-in-out rounded-md' onClick={saveDetails}>Save Changes</button>
                    </div>
                </div>
                <div>
                    <h3 className='font-medium text-md mb-4 mt-8'>Change Password</h3>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm text-gray-600' htmlFor="currentPassword">Current Password</label>
                        <input className='p-4 border mb-4 border-gray-600 rounded-md' type="password" name="currentPassword" id="currentPassword" value={newPassword.currentPassword} onChange={handlePasswordChange}/>
                        <label className='mb-2 text-sm text-gray-600' htmlFor="newPassword">New Password</label>
                        <input className='p-4 border mb-4 border-gray-600 rounded-md' type="password" name="newPassword" id="newPassword" value={newPassword.newPassword} onChange={handlePasswordChange}/>
                        <label className='mb-2 text-sm text-gray-600' htmlFor="confirmPassword">Confirm New Password</label>
                        <input className='p-4 border mb-4 border-gray-600 rounded-md' type="password" name="confirmPassword" id="confirmPassword" value={newPassword.confirmPassword} onChange={handlePasswordChange}/>
                        <button className='bg-black text-white p-4 mt-4 hover:bg-gray-500 duration-100 ease-in-out rounded-md' onClick={savePassword}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default AdminProfile
