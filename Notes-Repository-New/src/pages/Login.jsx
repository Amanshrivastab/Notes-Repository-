import { useState } from "react";
import Navbar from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../utils/authApi";
import useAuth from "../hooks/useAuth";



function Login() {
    // FORM STATE
      const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    const navigate = useNavigate();
    const {login} = useAuth();

    // FORM VALIDATION
    const validateForm = () => {

        const newError = {};

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 // Email validation
        if (!email.trim()) {
            newError.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newError.email =
                "Please enter a valid email";
        }
        // Password validation

        if (!password.trim()) {

            newError.password =
                "Password is required";

        } else if (password.length < 6) {

            newError.password =
                "Password must be at least 6 characters";
        }


        setError(newError);

        return Object.keys(newError).length === 0;
    };


    // ========================================
    // LOGIN
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Validate form

        const isValid = validateForm();

        if (!isValid) {
            return;
        }


        try {

            setLoading(true);

            // Clear previous general error

            setError({});
            // CALL LOGIN API
            
            const data = await loginUser(
                email,
                password
            );
              // using the useAuth and Authcontext for storeing the token
            login(data.user, data.token);
            console.log("Login successful");
            console.log("Token stored");

            navigate("/");
        } catch (error) {
            console.error(
                "LOGIN ERROR:",
                error
            );

            setError({
                general:
                    error.message ||
                    "Unable to connect to server"
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Navbar />

            <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5 py-10 bg-gray-50">

                <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">

                    <h1 className="text-center font-bold text-3xl text-gray-800">
                        Login
                    </h1>

                    <p className="text-center text-gray-500 mt-2">
                        Login to access your account
                    </p>
                    {error.general && (
                        <p className="text-red-500 text-sm text-center mt-4">
                            {error.general}
                        </p>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8"
                    >

                        <div>
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


                        {/* ========================================
                            PASSWORD
                        ======================================== */}

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
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >

                            {loading
                                ? "Logging in..."
                                : "Login"
                            }

                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-6">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </main>
        </>
    );
}

export default Login;