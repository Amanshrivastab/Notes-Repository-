import { useState } from "react";
import Navbar from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";

const Register =()=>{

  const [name ,setName ] =useState("");
  const [ email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [error, setError] =useState({});
  const [serverError , setServerError] = useState("");
  const [success,setSuccess] = useState("");
  const [loading , setLoading]= useState(false);

  const Navigate = useNavigate();

  const validateForm = () =>{
    const newError = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      newError.name = "Name is required";
    };

    if (!email.trim()) {
      newError.email = "Email is required";
    }
    else if (!emailRegex.test(email)) {
      newError.email = "Please enter a valid email";
    };

    if (!password.trim()) {
      newError.password = "Password is required";
    } 
    else if (password.length < 6) {
      newError.password =
        "Password must be at least 6 characters";
    };

    if (!confirmPassword.trim()) {
      newError.confirmPassword =
        "Please confirm your password";
    } 
    else if (password !== confirmPassword) {
      newError.confirmPassword =
        "Passwords do not match";
    };


    setError(newError);

    return Object.keys(newError).length === 0;
  };

    // ========================================
  // REGISTER
  // ========================================

  const handleSubmit = async(e) =>{
    try{

    e.preventDefault()
    setServerError("");
    setSuccess("");
    const isValid =  validateForm();

    if(!isValid){
      return;
    }
    setLoading(true);
    const response = await fetch(
       "http://localhost:5000/api/auth/register",
       {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
          })
       }
    );
    const data = await response.json();

    console.log("REGISTER RESPONSE:", data);

    if(!response.ok){
      setServerError(
          data.message || "Registration failed"
        );
        return;
    };

     // Registration successful

      setSuccess(
        data.message || "Registration successful"
      );
       setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError({});

      // Go to login page after 1 second

      setTimeout(() => {
        Navigate("/login");
      }, 1000);

    }catch(error){
      console.error("REGISTRATION ERROR",error);
      setServerError(
        "Unable to connect to server"
      );

    }
    finally{
      setLoading(false);
    };

  };


 return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5 py-10 bg-gray-50">

        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">

          <h1 className="text-center text-3xl font-bold text-gray-800">
            Register
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Create your account
          </p>


          {/* Server Error */}

          {serverError && (
            <p className="text-red-500 text-sm text-center mt-4">
              {serverError}
            </p>
          )}


          {/* Success */}

          {success && (
            <p className="text-green-600 text-sm text-center mt-4">
              {success}
            </p>
          )}


          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >

            {/* NAME */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {error.name && (
                <p className="text-red-500 text-sm mt-1">
                  {error.name}
                </p>
              )}

            </div>


            {/* EMAIL */}

            <div className="mt-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {error.email && (
                <p className="text-red-500 text-sm mt-1">
                  {error.email}
                </p>
              )}

            </div>


            {/* PASSWORD */}

            <div className="mt-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {error.password && (
                <p className="text-red-500 text-sm mt-1">
                  {error.password}
                </p>
              )}

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="mt-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {error.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {error.confirmPassword}
                </p>
              )}

            </div>


            {/* REGISTER */}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>


          {/* LOGIN LINK */}

          <p className="text-center text-sm text-gray-600 mt-6">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </main>
    </>
  );
};

export default Register;