import { useNavigate } from "react-router-dom";

const LandingScreen = () => {
    const navigate = useNavigate();
    return (
        <section className="h-screen flex flex-col justify-center items-center px-8 md:flex-row md:justify-between  md:gap-x-12 md:px-0">
            <img
                src={`https://images.unsplash.com/photo-1604882356818-9100fce260a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80`}
                alt="group of friends having a discourse"
                loading="_lazy"
                className="hidden md:block  object-contain md:w-3/6 rounded-2xl lg:w-6/6"
            />
            <div className="text-center md:text-left lg:mr-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-3">
                    Discourse
                </h1>
                <p className="text-center md:text-left text-base mt-2 font-medium md:text-lg lg:text-xl mb-4">
                    Your Gateway to Engaging Discussions and Meaningful
                    Connections
                </p>
                <button
                    className="px-4 py-2 md:text-xl bg-indigo-600 hover:bg-indigo-500 text-white text-base rounded-lg mb-2"
                    onClick={() => navigate(`/signup`)}
                >
                    Join Now
                </button>
                <p>
                    Already have an account ?{" "}
                    <span
                        className="text-blue-700"
                        onClick={() => navigate(`/login`)}
                    >
                        Log in
                    </span>
                </p>
            </div>
        </section>
    );
};

export default LandingScreen;
