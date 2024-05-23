import {useState, useEffect} from 'react'
import AdminSideBar from '../components/AdminSideBar'
import { Outlet } from 'react-router-dom'
import useAuthContext from '../constants/checkAuth'
import AdminReport from './AdminReport';

function AdminDashboard() {
    const checkAuth = useAuthContext();
    const [auth, setAuth] = useState(false)
    const [role, setRole] = useState('')

    //get url params
    const url = window.location.pathname.split('/')
    
    useEffect(()=> {
        const {auth, role} = checkAuth();
        console.log(auth, role)
        setAuth(auth)
        setRole(localStorage.getItem('role'))
    },[])

    if(!auth || role !== 'admin') {
        return (
            <div className='flex flex-col w-screen h-screen items-center mt-16'>
                <svg xmlns="http://www.w3.org/2000/svg" width="7em" height="7em" viewBox="0 0 24 24"><path fill="black" d="m21.171 15.398l-5.912-9.854C14.483 4.251 13.296 3.511 12 3.511s-2.483.74-3.259 2.031l-5.912 9.856c-.786 1.309-.872 2.705-.235 3.83C3.23 20.354 4.472 21 6 21h12c1.528 0 2.77-.646 3.406-1.771c.637-1.125.551-2.521-.235-3.831M12 17.549c-.854 0-1.55-.695-1.55-1.549c0-.855.695-1.551 1.55-1.551s1.55.696 1.55 1.551c0 .854-.696 1.549-1.55 1.549m1.633-7.424c-.011.031-1.401 3.468-1.401 3.468c-.038.094-.13.156-.231.156s-.193-.062-.231-.156l-1.391-3.438a1.776 1.776 0 0 1-.129-.655c0-.965.785-1.75 1.75-1.75a1.752 1.752 0 0 1 1.633 2.375"/></svg>
                <h1 className='text-5xl font-medium m-0 mt-8'>Unauthorized Account</h1>
                <p className='mb-8'>You are have no access to this page, please use an authorized account.</p>
                <button onClick={()=> {
                    localStorage.removeItem('token')
                    localStorage.removeItem('role')
                    window.location.href = '/signin-admin'
                }} className='bg-black text-white p-4 rounded-md mt-8'>Sign in as Admin</button>
            </div>
        )
    }
    
  return (
    <div className='flex bg-gray-100'>
      <div className='w-64 flex flex-col bg-black text-white h-screen fixed'>
        <AdminSideBar/>
      </div>
      <div className='flex-grow pl-64'>
      {
        url.length <= 2 ? (
          <AdminReport/>
        ) : <Outlet/>
      }
        
      </div>
    </div>
  )
}

export default AdminDashboard
