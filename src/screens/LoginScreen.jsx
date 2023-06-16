import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { storeContext } from "../utils/store";

const LoginScreen = () => {
    const navigate = useNavigate();
    const { authReducer } = useContext(storeContext);
    const [formData, setFormData] = useState({});
    const [loginStatus, setLoginStatus] = useState();
    const location = useLocation();

    const loginHandler = async (event) => {
        event.preventDefault();
        let response = await authReducer({ type: "login", data: formData });
        if (response.status === "success") {
            setFormData({});
            if (location.state == null) {
                navigate("/home");
            } else {
                navigate(location?.state?.from?.pathname);
            }
        } else {
            setLoginStatus(response.message);
            setFormData({});
        }
    };

    return (
        <section className="flex flex-col h-screen justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-serif text-center">Discourse</h1>
            <br />
            <form
                className="bg-white px-10 py-10 w-[325px] md:w-[500px] rounded-lg"
                onSubmit={loginHandler}
            >
                <h3 className="font-bold text-2xl text-center">Login</h3>
                <br />
                <label htmlFor="email" className="text-sm">
                    Email
                </label>
                <br />
                <input
                    className="py-2 px-1 w-full outline-none border-2 text-base"
                    type="email"
                    placeholder="gavin@hooli.com"
                    onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })
                    }
                    value={formData.email ? formData.email : ""}
                />
                <br />
                <br />
                <label htmlFor="password" className="text-sm">
                    Password
                </label>
                <br />
                <input
                    className="py-2 px-1 outline-none w-full border-2 text-base"
                    type="password"
                    placeholder="shhhh"
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            password: event.target.value,
                        })
                    }
                    value={formData.password ? formData.password : ""}
                />
                <br />
                <br />
                <button className="px-4 w-full py-2 border text-lg text-white bg-blue-700 hover:bg-blue-600 rounded-lg">
                    Login
                </button>
                <br />
                <br />
                <p className="text-base text-center">
                    Don't have an account ?{" "}
                    <span
                        onClick={() =>
                            navigate(`/signup`, {
                                state: {
                                    from: location?.state?.from?.pathname,
                                },
                            })
                        }
                        className="text-sky-600 hover:underline hover:cursor-pointer"
                    >
                        Sign up
                    </span>
                </p>
                <br />
                <p className="text-center bg-red-300">
                    {loginStatus ? loginStatus : ""}
                </p>
            </form>
        </section>
    );
};

export default LoginScreen;
