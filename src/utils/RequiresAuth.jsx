import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { storeContext } from "./store";

const RequiresAuth = ({ children }) => {
    let location = useLocation();
    const { user } = useContext(storeContext);

    if (Object.keys(user).length !== 0) {
        return children;
    } else {
        return (
            <Link to={"/login"} state={{ from: location }}>
                <div className="flex h-screen justify-center items-center text-xl md:text-2xl lg:text-3xl">
                    <p>
                        you need to{" "}
                        <span className="text-blue-500 hover:underline">
                            log in
                        </span>{" "}
                        first
                    </p>
                </div>
            </Link>
        );
    }
};

export default RequiresAuth;
