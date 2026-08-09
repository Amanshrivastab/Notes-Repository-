import { useState,consloe } from "react";
import Navbar from "../components/navbar";

const Register = ()=> {
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword ] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [error , setError] = useState({});

    const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if(!isValid){
      return
    }
    console.log("form is valid ");
  };

    const validateForm  = ()=>{
    const newError = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!name.trim()){
      newError.name = "name is required ";
    }
    
    if(!email.trim()){
      newError.email = "Email is required";
    }else if (!emailRegex.test(email)) {
       newError.email = "Please enter a valid email";
      }

    if(!password.trim()){
      newError.password = "Password is required ";
    }else if (password.length < 6) {
        newError.password = "Password must be at least 6 characters";
      }

    if (!confirmPassword.trim()) {
    newError.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    newError.confirmPassword = "Passwords do not match";
  }

    setError(newError);

    return Object.keys(newError).length === 0;
  }

    return(
        <>
            <Navbar/>

             <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5 py-10 bg-gray-50">

            <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">

        <form onSubmit={handleSubmit} className="mt-8">
            {/*name*/}
            <div>
                <label className="block  text-sm font-medium text-gray-700 mb-2">
                    Name
                </label>

                <input 
                type="Text"
                placeholder="Enter your name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error.name && (
                 <p className="text-red-500 text-sm mt-1">
                   {error.name}
                   </p>
                  )}
            </div>

            {/* Email */}
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
               {error.email && (
                 <p className="text-red-500 text-sm mt-1">
                   {error.email}
                   </p>
                  )}
            </div>

            {/* Password */}
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.password && (
                 <p className="text-red-500 text-sm mt-1">
                   {error.password}
                   </p>
                  )}
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                confirmPassword
              </label>

              <input
                type="password"
                placeholder="confrim your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.confirmPassword && (
                 <p className="text-red-500 text-sm mt-1">
                   {error.confirmPassword}
                   </p>
                  )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Register
            </button>

          </form>

          </div>
          </main>

          </>
    )
}
export default Register;