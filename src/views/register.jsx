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
        <div className="flex justify-center items-start min-h-screen bg-gray-900">
            <div className="mt-10 w-full max-w-sm rounded-lg shadow-lg">
                <h1 className="mb-8 text-2xl font-bold text-center text-white">
                    Create Account
                </h1>
                <form onSubmit={Submit}>
                    <div className="flex flex-col gap-5 mb-6">
                        <div>
                            <input
                                ref={nameRef}
                                type="text"
                                placeholder="Enter Your Name"
                                className="px-4 py-3 w-full text-xl text-white bg-gray-800 rounded-xl border-2 border-gray-600 placeholder:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.name && (
                                <div className="mt-1 text-sm text-red-500">{errors.name[0]}</div>
                            )}
                        </div>
                        <div>
                            <input
                                ref={emailRef}
                                type="email"
                                placeholder="Enter Your Email"
                                className="px-4 py-3 w-full text-xl text-white bg-gray-800 rounded-xl border-2 border-gray-600 placeholder:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.email && (
                                <div className="mt-1 text-sm text-red-500">{errors.email[0]}</div>
                            )}
                        </div>
                        <div>
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder="Password"
                                className="px-4 py-3 w-full text-xl text-white bg-gray-800 rounded-xl border-2 border-gray-600 placeholder:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.password && (
                                <div className="mt-1 text-sm text-red-500">{errors.password[0]}</div>
                            )}
                        </div>
                        <div>
                            <input
                                ref={confirmPasswordRef}
                                type="password"
                                placeholder="Confirm Password"
                                className="px-4 py-3 w-full text-xl text-white bg-gray-800 rounded-xl border-2 border-gray-600 placeholder:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-4 w-full text-xl font-bold text-white bg-sky-500 rounded-xl border-b-4 border-sky-700 transition-colors duration-300 hover:bg-sky-400"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-xl font-bold text-gray-600">
                    <p className="relative text-center before:content-[''] before:block before:w-[45%] before:h-1 before:rounded-full before:bg-gray-600 before:absolute before:left-0 before:top-1/2 after:content-[''] after:block after:w-[45%] after:h-1 after:rounded-full after:bg-gray-600 after:absolute after:right-0 after:top-1/2">
                        OR
                    </p>
                </div>
                <button className="px-4 py-4 mt-4 w-full text-xl font-bold text-sky-500 rounded-xl border-2 border-b-4 border-gray-600 transition-colors duration-300">
                    <Link
                        to="/login"
                        className="text-blue-400 transition-colors duration-300 hover:text-blue-500"
                    >
                        Login
                    </Link>
                </button>
            </div>
        </div>
    )
}