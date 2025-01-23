import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function register(){
    const [errors, setErrors] = useState({});
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit = (ev) =>{
        ev.preventDefault();
        setErrors({}); // Clear previous errors
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value,
        }
        axiosClient.post("auth/register",payload).then(({data})=>{
            setUser(data.data.user.email);
            setToken(data.data.authorization.token);
        }).catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors);
            }
        });
    }

    return(
        <div className="min-h-screen bg-gray-900 flex items-start justify-center">
            <div className="mt-10 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold text-white text-center mb-8">
                    Create Account
                </h1>
                <form onSubmit={Submit}>
                    <div className="flex flex-col gap-5 mb-6">
                        <div>
                            <input
                                ref={nameRef}
                                type="text"
                                placeholder="Enter Your Name"
                                className="text-xl w-full px-4 py-3 bg-gray-800 text-white placeholder:text-gray-50 border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm mt-1">{errors.name[0]}</div>
                            )}
                        </div>
                        <div>
                            <input
                                ref={emailRef}
                                type="email"
                                placeholder="Enter Your Email"
                                className="text-xl w-full px-4 py-3 bg-gray-800 text-white placeholder:text-gray-50 border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.email && (
                                <div className="text-red-500 text-sm mt-1">{errors.email[0]}</div>
                            )}
                        </div>
                        <div>
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder="Password"
                                className="text-xl w-full px-4 py-3 bg-gray-800 text-white placeholder:text-gray-50 border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.password && (
                                <div className="text-red-500 text-sm mt-1">{errors.password[0]}</div>
                            )}
                        </div>
                        <div>
                            <input
                                ref={confirmPasswordRef}
                                type="password"
                                placeholder="Confirm Password"
                                className="text-xl w-full px-4 py-3 bg-gray-800 text-white placeholder:text-gray-50 border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-xl font-bold w-full bg-sky-500 text-white py-4 px-4 rounded-xl border-b-4 border-sky-700 hover:bg-sky-400 transition-colors duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-gray-600 text-xl font-bold">
                    <p className="relative text-center before:content-[''] before:block before:w-[45%] before:h-1 before:rounded-full before:bg-gray-600 before:absolute before:left-0 before:top-1/2 after:content-[''] after:block after:w-[45%] after:h-1 after:rounded-full after:bg-gray-600 after:absolute after:right-0 after:top-1/2">
                        OR
                    </p>
                </div>
                <button className="text-xl font-bold w-full text-sky-500 py-4 px-4 rounded-xl border-2 border-b-4 border-gray-600 transition-colors duration-300 mt-4">
                    <Link
                        to="/login"
                        className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
                    >
                        Login
                    </Link>
                </button>
            </div>
        </div>
    )
}