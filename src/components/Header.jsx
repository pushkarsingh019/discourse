import { useContext } from "react";
import profileImage from "../assets/profile.svg";
import { storeContext } from "../utils/store";

const Header = () => {
    const { user } = useContext(storeContext);
    return (
        <header className="hidden md:flex justify-between items-center px-5 py-4 bg-indigo-600 header">
            <h3 className="md:text-3xl font-medium text-white">Discourse</h3>
            {Object.keys(user).length === 0 ? (
                <div className="flex">
                    <img src={profileImage} alt="profile" />
                    <span className="text-white ml-1">Login</span>
                </div>
            ) : (
                <div className="flex">
                    <img src={profileImage} alt="profile" />
                    <p className="text-lg text-white ml-1">{user.username}</p>
                </div>
            )}
        </header>
    );
};

export default Header;
