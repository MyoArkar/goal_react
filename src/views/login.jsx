import { useRef } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axiosClient";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const Submit = (ev) => {
    ev.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post("auth/login", payload).then(({ data }) => {
      setUser(data.data.user.email);
      setToken(data.data.token)
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.errors);
      }
    });
  }
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Login to Your Account
        </h1>
        <form onSubmit={Submit} className="space-y-4">
          <div>
            <input ref={emailRef}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input ref={passwordRef}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
          <p className="text-sm text-gray-400 text-center">
            Not Registered?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
            >
              Create a new account
            </Link>
          </p>
        </form>
      </div>
    </div>

  );
}