import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axiosClient";

export default function Login() {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  
  const Submit = (ev) => {
    ev.preventDefault()
    setError(""); // Clear previous errors
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post("auth/login", payload).then(({ data }) => {
      setUser(data.data.user.email);
      setToken(data.data.authorization.token)
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 401) {
        setError(response.data.errors.error);
      }
    });
  }
  
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-900">
      <div className="mt-10 w-full max-w-sm rounded-lg shadow-lg">
        <h1 className="mb-8 text-2xl font-bold text-center text-white">
          Log in
        </h1>
        {error && (
          <div className="p-3 mb-4 text-center text-white bg-red-500 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={Submit}>
          <div className="flex flex-col gap-5 mb-6">
            <input 
              ref={emailRef}
              type="email"
              placeholder="Enter Your Email"
              className="px-4 py-3 w-full text-xl text-white bg-gray-800 rounded-xl border-2 border-gray-600 placeholder:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input 
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="px-4 py-3 w-full text-xl text-white bg-gray-800 rounded-xl border-2 border-gray-600 placeholder:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-4 w-full text-xl font-bold text-white bg-sky-500 rounded-xl border-b-4 border-sky-700 transition-colors duration-300 hover:bg-sky-400"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-xl font-bold text-gray-600">
          <p className="relative text-center before:content-[''] before:block before:w-[45%] before:h-1 before:rounded-full before:bg-gray-600 before:absolute before:left-0 before:top-1/2 after:content-[''] after:block after:w-[45%] after:h-1 after:rounded-full after:bg-gray-600 after:absolute after:right-0 after:top-1/2">
            OR
          </p>
        </div>
        <button className="px-4 py-4 mt-4 w-full text-xl font-bold text-sky-500 rounded-xl border-2 border-b-4 border-gray-600 transition-colors duration-300">
          <Link
            to="/register"
            className="text-blue-400 transition-colors duration-300 hover:text-blue-500"
          >
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
}