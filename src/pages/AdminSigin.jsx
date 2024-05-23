import { Link, useNavigate } from "react-router-dom";
import jumpman from "../assets/jumpman.png"
import swoosh from "../assets/swoosh.png"
import useAuthContext from "../constants/checkAuth";
import { useState, useEffect } from "react";
import API_URL from "../constants/api";

const Signin = () => {
    const checkAuth = useAuthContext();
    const [auth, setAuth] = useState(false)
    const [role, setRole] = useState('')
    //const {auth, role} = checkAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const handleSignin = (e) => {
        e.preventDefault();
        
        if(email === "" || password === "") {
            setError("Please fill in all fields.")
            setTimeout(() => {
                setError("")
            }, 3000)
            return
        }
        
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `${API_URL}admin/login-admin`, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    if(res.error) {
                        setError(res.error)
                        setTimeout(() => {
                            setError("")
                        }, 3000)
                        return
                    }
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("role", "admin")
                    navigate("/admin")
                }
                //if 401
                if(xhr.readyState === 4 && xhr.status === 401) {
                    setError("Invalid credentials.")
                    setTimeout(() => {
                        setError("")
                    }, 3000)
                    return
                }
            }
            xhr.send(JSON.stringify({email, password}))
        } catch (error) {
            console.log(error)
        }
    }
    //TODO: SNIPPET
    // useEffect(() => {
    //     if(auth && role === "user") {
    //         navigate("/")
    //         return
    //     }
    //     if(auth && role === "admin") {
    //         navigate("/admin")
    //         return
    //     }
    //     if(!auth) {
    //         return
    //     }
    // }, [auth, role])

    useEffect(() => {
        const {auth, role} = checkAuth();
        setAuth(auth)
        if(auth){
            if(role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/')
            }
        }
    }, [])

    return (
        <div className="flex justify-center flex-col items-center mt-8">
            <div className="flex flex-col max-w-98">
                <div className="flex items-end">
                    <Link to="/" className="flex items-center"><img src={swoosh} alt="swoosh" className="w-16 h-auto object-contain"/></Link>
                    <img src={jumpman} alt="swoosh" className="w-16 h-auto object-contain"/>
                    <p>ADMIN</p>
                </div>
                <div>
                    <h3 className="text-2xl">Enter your credentials to sign in.</h3>
                </div>
                <div className="flex flex-col justify-start">
                    
                    <form action="" className="flex flex-col mt-8">
                        <p className="text-red-600">{error}</p>
                        <label>Email</label>
                        <input type="text" className="w-full border border-gray-800 rounded-md p-2 mb-8" onChange={(e) => setEmail(e.target.value)} />
                        <label>Password</label>
                        <input type="password" className="w-full border border-gray-800 rounded-md p-2 mb-8" onChange={(e) => setPassword(e.target.value)}/>
                    </form>
                    <p className="">By continuing, I agree to Nike's Privacy <br/>Policy and Terms of Use.</p>
                    <button className="px-12 py-4 bg-black mt-8 text-white rounded-md hover:bg-gray-700" onClick={handleSignin}>Sign in</button>
                    <p className="my-4">Are you a customer? <Link to="/signin" className="text-blue-600">Click here.</Link></p>

                </div>
            </div>

        </div>
    );
    }

    export default Signin;