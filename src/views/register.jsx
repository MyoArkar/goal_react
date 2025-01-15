import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function register(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("auth/register",payload).then(({data})=>{
            setUser(data.data.user.email);
            setToken(data.data.token);
    }).catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
        }
    });
}

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
      Create A New Account
    </h1>
    <form onSubmit={Submit} className="space-y-4">
      <input
        ref={nameRef}
        type="text"
        placeholder="Name"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        ref={emailRef}
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Register
      </button>
      <p className="text-sm text-gray-600 text-center">
        Already Have An Account?{" "}
        <Link
          to="/login"
          className="text-blue-500 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  </div>
</div>

    )
}