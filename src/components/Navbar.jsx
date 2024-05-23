import { Link } from "react-router-dom";
import Jumpman from "../assets/jumpman.png"
import swoosh from "../assets/swoosh.png"
import cart from "../assets/cart.png"
import profile from "../assets/profile.png"
import { useEffect, useState } from "react";
import useAuthContext from "../constants/checkAuth";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({type}) => {
    const [signedIn, setSignedIn] = useState(false)
    const[role, setRole] = useState('')
    const [auth, setAuth] = useState(false)
    const [categories, setCategories] = useState(['Best Seller', 'Men', 'Women', 'Kid', 'On sale'])

    const [search, setSearch] = useState('')
    const navigate = useNavigate();
    const location = useLocation();

    const checkAuth = useAuthContext();
    

    const queryParams = new URLSearchParams(location.search);
    const handleChange = (name, value) => {
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set(name, value);
    
        navigate({
          pathname: location.pathname,
          search: newSearchParams.toString(),
        });
    }; 

    const handleSearch = (e) => {
        e.preventDefault();
        if (search) {
            handleChange('search', search.toLowerCase());
        } else {
            const newSearchParams = new URLSearchParams(location.search);
            newSearchParams.delete('search');
            navigate({
                pathname: location.pathname,
                search: newSearchParams.toString(),
            });
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/signin');
    }

    useEffect(() => {
        if(search === '' || search === undefined || search === null) {
            console.log('search is empty')
            //remove search from query params
            const newSearchParams = new URLSearchParams(location.search);
            newSearchParams.delete('search');
            navigate({
                pathname: location.pathname,
                search: newSearchParams.toString(),
            });
        }
    },[search])

    useEffect(() => {
        const {auth, role} = checkAuth();
        setAuth(auth);
        setRole(role);
    }, [])

    return (
        <main className="flex flex-col">
            <div className="flex px-10 justify-between bg-gray-100 py-2">
                <div>
                    <img src={Jumpman} alt="Jumpman" className="w-5 h-auto mx-2"/>
                </div>

                <div className="flex gap-2 text-xs items-center">
                    {
                        auth && <div className="flex align-center gap-6">
                            <Link to="/cart">Cart</Link>
                            <Link to="/orders">Orders</Link>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </div>
                    }
                    {
                        !auth && <div className="flex gap-6 text-xs items-center">
                            <Link to="/signup">Sign Up</Link>
                            <Link to="/signin">Sign In</Link>
                        </div>
                    }
                    
                </div>

            </div>

            <div className="flex px-10 justify-between py-2 items-center">
                <div>
                    <Link to='/'>

                    <img src={swoosh} alt="swoosh" className="w-16 h-auto" />
                    </Link>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                    {type !== 'products' ? (
                <ul>
                    {
                        categories.map((category, index) => {
                            let formattedCategory = category.toLowerCase().replace(/ /g, '');
                            if (['Men', 'Women', 'Kid'].includes(category)) {
                                return <li key={index} className="inline mx-2"><Link to={`/products?sex=${formattedCategory}`}>{category}</Link></li>
                            } else {
                                return <li key={index} className="inline mx-2"><Link to={`/products?tag=${formattedCategory}`}>{category}</Link></li>
                            }
                        })
                    }
                </ul>
                ): null}


                </div>
                <div className="flex items-center gap-4">
                    {
                        type === 'products' && <form className="flex gap-2" onSubmit={(e) => handleSearch(e)}>
                            <input type="text" placeholder="Search" className="border-2 border-gray-300 rounded-md p-1" onChange={(e)=> setSearch(e.target.value)}/>
                            <button className="bg-black text-white rounded-md px-2" type="submit">Search</button>
                        </form>
                        
                    }
                    <Link to="/cart">
                        <img src={cart} alt="cart" className="w-5 h-auto" />
                    </Link>
                    <Link to="/orders">
                        <img src={profile} alt="cart" className="w-5 h-auto" />
                    </Link>
                    
                </div>
            </div>
        </main>
    );
    }

    export default Navbar;