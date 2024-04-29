import { Link } from "react-router-dom";
import Jumpman from "../assets/jumpman.png"
import swoosh from "../assets/swoosh.png"
import cart from "../assets/cart.png"
import profile from "../assets/profile.png"
import { useState } from "react";

const Navbar = () => {
    const [signedIn, setSignedIn] = useState(true)
    const [categories, setCategories] = useState(['New Arrivals', 'Men', 'Women', 'Kids', 'On sale'])
    return (
        <main className="flex flex-col">
            <div className="flex px-10 justify-between bg-gray-100 py-2">
                <div>
                    <img src={Jumpman} alt="Jumpman" className="w-5 h-auto mx-2"/>
                </div>
                <div className="flex gap-2 text-xs items-center">
                    {
                        signedIn && <div className="flex align-center gap-6">
                            <Link to="/cart">Cart</Link>
                            <Link to="/orders">Orders</Link>
                            <Link to="/signin">Sign Out</Link>
                        </div>
                    }
                    {
                        !signedIn && <div className="flex gap-6 text-xs items-center">
                            <Link to="/signup">Sign Up</Link>
                            <Link to="/signin">Sign In</Link>
                        </div>
                    }
                </div>

            </div>

            <div className="flex px-10 justify-between py-2 items-center">
                <div>
                    <img src={swoosh} alt="swoosh" className="w-16 h-auto" />
                </div>
                <div className="flex items-center gap-2 font-semibold">
                    <ul>
                        {
                            categories.map((category, index) => {
                                return <li key={index} className="inline mx-2"><Link to={`/products?query=${category}`}>{category}</Link></li>
                            })
                        }
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/cart">
                        <img src={cart} alt="cart" className="w-5 h-auto" />
                    </Link>
                    <Link to="/profile">
                        <img src={profile} alt="cart" className="w-5 h-auto" />
                    </Link>
                    
                </div>
            </div>
        </main>
    );
    }

    export default Navbar;