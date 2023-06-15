import { useNavigate } from "react-router-dom";
import openEyes from "../assets/openEye.svg";
import closeEye from "../assets/closeEye.svg";
import { useState } from "react";
const SignupScreen = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    return (
        <section className="flex flex-col h-screen justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-serif text-center">Discourse</h1>
            <br />
            <form className="bg-white px-10 py-10 w-[325px] md:w-[500px] rounded-lg">
                <h3 className="font-bold text-2xl text-center">Signup</h3>
                <br />
                <label htmlFor="username" className="text-sm">
                    Username
                </label>
                <br />
                <input
                    className="py-2 px-1 w-full outline-none border-2 text-base"
                    type="text"
                    placeholder="gavin_belson"
                    required
                />
                <br />
                <br />
                <label htmlFor="email" className="text-sm">
                    Email
                </label>
                <br />
                <input
                    className="py-2 px-1 w-full outline-none border-2 text-base"
                    type="email"
                    placeholder="gavin@hooli.com"
                    required
                />
                <br />
                <br />
                <div className="justify-between flex">
                    <label htmlFor="password" className="text-sm">
                        Password
                    </label>
                    <img
                        src={showPassword.password ? closeEye : openEyes}
                        alt={
                            showPassword.password
                                ? "hide password"
                                : "show password"
                        }
                        onClick={() =>
                            setShowPassword({
                                ...showPassword,
                                password: !showPassword.password,
                            })
                        }
                    />
                </div>
                <input
                    className="py-2 px-1 outline-none w-full border-2 text-base"
                    type={showPassword.password ? "text" : "password"}
                    placeholder="shhhh"
                    required
                />
                <br />
                <br />
                <div className="flex justify-between mb-0">
                    <label htmlFor="password" className="text-sm">
                        Confirm Password
                    </label>
                    <img
                        src={showPassword.confirmPassword ? closeEye : openEyes}
                        alt={
                            showPassword.confirmPassword
                                ? "hide password"
                                : "show password"
                        }
                        onClick={() =>
                            setShowPassword({
                                ...showPassword,
                                confirmPassword: !showPassword.confirmPassword,
                            })
                        }
                    />
                </div>
                <input
                    className="py-2 px-1 outline-none w-full border-2 text-base"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    placeholder="confirm password "
                    required
                />
                <br />
                <br />
                <button className="px-4 w-full py-2 border text-lg text-white bg-blue-700 hover:bg-blue-600 rounded-lg">
                    Create Account
                </button>
                <br />
                <br />
                <p className="text-base text-center">
                    Already have an account ?{" "}
                    <span
                        onClick={() => navigate(`/login`)}
                        className="text-sky-600 hover:underline hover:cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </form>
        </section>
    );
};

export default SignupScreen;
