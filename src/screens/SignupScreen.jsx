import { useLocation, useNavigate } from "react-router-dom";
import openEyes from "../assets/openEye.svg";
import closeEye from "../assets/closeEye.svg";
import { useContext, useState } from "react";
import { storeContext } from "../utils/store";

const SignupScreen = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const { authReducer } = useContext(storeContext);
    const location = useLocation();

    const signupHandler = async (event) => {
        event.preventDefault();
        if (formData.password === formData.confirmPassword) {
            let response = await authReducer({
                type: "signup",
                data: formData,
            });
            if (response.status === "success") {
                if (location.state.from !== undefined) {
                    navigate(location.state.from);
                } else {
                    navigate("/home");
                }
            } else {
                setMessage(response.message);
                setFormData({});
            }
        } else {
            setMessage("passwords don't match");
        }
    };

    return (
        <section className="flex flex-col h-screen justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-serif text-center">Discourse</h1>
            <br />
            <form
                onSubmit={signupHandler}
                className="bg-white px-10 py-10 w-[325px] md:w-[500px] rounded-lg"
            >
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
                    value={formData.username ? formData.username : ""}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            username: event.target.value,
                        })
                    }
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
                    value={formData.email ? formData.email : ""}
                    onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })
                    }
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
                    value={formData.password ? formData.pasword : ""}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            password: event.target.value,
                        })
                    }
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
                    value={
                        formData.confirmPassword ? formData.confirmPassword : ""
                    }
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            confirmPassword: event.target.value,
                        })
                    }
                />
                <br />
                <br />
                <button
                    type="submit"
                    className="px-4 w-full py-2 border text-lg text-white bg-blue-700 hover:bg-blue-600 rounded-lg"
                >
                    Create Account
                </button>
                <br />
                <br />
                <p className="text-base text-center">
                    Already have an account ?{" "}
                    <span
                        onClick={() =>
                            navigate(`/login`, {
                                state:
                                    location.state !== null
                                        ? {
                                              from: {
                                                  pathname: location.state.from,
                                              },
                                          }
                                        : null,
                            })
                        }
                        className="text-sky-600 hover:underline hover:cursor-pointer"
                    >
                        Login
                    </span>
                </p>
                <br />
                <p className="text-center bg-red-300">{message}</p>
            </form>
        </section>
    );
};

export default SignupScreen;
