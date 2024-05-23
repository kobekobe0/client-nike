import { Link, useNavigate } from "react-router-dom";
import jumpman from "../assets/jumpman.png"
import swoosh from "../assets/swoosh.png"
import useAuthContext from "../constants/checkAuth";
import API_URL from "../constants/api";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Signup = () => {
    const {auth, role} = useAuthContext();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate();

    const handleSignUp = (e) => {
        if(formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if(formData.password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }
        if(formData.name === '' || formData.username === '' || formData.email === '') {
            toast.error('Please fill in all fields');
            return;
        }
        //check if email is valid
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailRegex.test(formData.email)) {
            toast.error('Invalid email address');
            return;
        }
        toast.loading('Signing up...');
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${API_URL}client/sign-up-client`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 201) {
                const res = JSON.parse(xhr.responseText);
                if(res.error) {
                    toast.dismiss()
                    toast.error(res.error)
                }
                toast.dismiss()
                toast.success('Account created successfully!')
                navigate("/signin")
            }
        }
        xhr.send(JSON.stringify(formData))
        console.log(formData)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <div className="flex justify-center flex-col items-center mt-8">
            <div className="flex flex-col max-w-98">
                <div className="flex">
                    <img src={swoosh} alt="swoosh" className="w-16 h-auto object-contain"/>
                    <img src={jumpman} alt="swoosh" className="w-16 h-auto object-contain"/>
                </div>
                <div>
                    <h3 className="text-2xl">Enter your credentials to sign up.</h3>
                </div>
                <div className="flex flex-col justify-start">
                    <form action="" className="flex flex-col mt-8">
                        <label>Name</label>
                        <input onChange={handleInputChange} name="name" type="text" className="w-full border border-gray-800 rounded-md p-2 mb-8" />
                        <label>Username</label>
                        <input onChange={handleInputChange} name="username" type="text" className="w-full border border-gray-800 rounded-md p-2 mb-8" />
                        <label>Email</label>
                        <input onChange={handleInputChange} name="email" type="text" className="w-full border border-gray-800 rounded-md p-2 mb-8" />
                        <label>Password</label>
                        <input onChange={handleInputChange} name="password" type="password" className="w-full border border-gray-800 rounded-md p-2 mb-8"/>
                        <label>Confirm Password</label>
                        <input onChange={handleInputChange} name="confirmPassword" type="password" className="w-full border border-gray-800 rounded-md p-2 mb-8"/>
                    </form>
                    <p className="">By continuing, I agree to Nike's Privacy <br/>Policy and Terms of Use.</p>
                    <button className="px-12 py-4 bg-black mt-8 text-white rounded-md hover:bg-gray-700" onClick={handleSignUp}>Sign up</button>
                    <p className="my-4">Already have an account? <Link to="/signin" className="text-blue-600">Sign in here.</Link></p>

                </div>
            </div>

        </div>
    );
    }

    export default Signup;