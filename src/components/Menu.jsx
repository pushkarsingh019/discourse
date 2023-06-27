import { useNavigate } from "react-router-dom";

// the meno would include -> home, explore, bookmark, profile, create
import home from "../assets/home.svg";
import explore from "../assets/explore.svg";
import create from "../assets/create.svg";
import bookmarks from "../assets/bookmark.svg";
import profile from "../assets/profileBlack.svg";
import { useContext } from "react";
import { storeContext } from "../utils/store";

const Menu = () => {
    const navigate = useNavigate();
    const { user } = useContext(storeContext);
    return (
        // <nav className=" menu flex justify-between items-center pb-2 pt-3 px-4 bg-gray-50 rounded-t-2xl bg-white-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border-solid border border-black">
        <nav className="menu md:h-screen shadow-sm backdrop-filter: blur(20px) bg-opacity-95 bg-gray-50 md:bg-gray-100 md:px-4 ">
            <div
                className="flex flex-col items-center md:flex-row md:px-3 md:py-2 md:mb-2 md:gap-x-2 md:hover:bg-white rounded-md md:hover:shadow-sm"
                onClick={() => navigate(`/`)}
            >
                <img
                    src={home}
                    alt="home"
                    className="md:w-7 md:h-7 md:object-contain"
                />
                <small className="text-sm md:text-base">Home</small>
            </div>
            <div
                className="flex flex-col items-center md:flex-row md:px-3 md:py-2 md:mb-2 md:gap-x-2  md:hover:bg-white rounded-md md:hover:shadow-sm"
                onClick={() => navigate(`/explore`)}
            >
                <img
                    src={explore}
                    alt="explore"
                    className="md:w-7 md:h-7 md:object-contain"
                />
                <small className="text-sm md:text-base">Explore</small>
            </div>
            <div
                className="flex flex-col items-center md:flex-row md:px-3 md:py-2 md:mb-2  md:gap-x-2  md:hover:bg-indigo-300 rounded-md md:hover:shadow-sm"
                onClick={() => navigate(`/create`)}
            >
                <img
                    src={create}
                    alt="create"
                    className="md:w-7 md:h-7 md:object-contain md:hover:text-white"
                />
                <small className="text-sm md:text-base">Create</small>
            </div>
            <div
                className="flex flex-col items-center md:flex-row md:px-3 md:py-2 md:mb-2 md:gap-x-2  md:hover:bg-white rounded-md md:hover:shadow-sm"
                onClick={() => navigate(`/bookmarks`)}
            >
                <img
                    src={bookmarks}
                    alt="bookmarks"
                    className="md:w-7 md:h-7 md:object-contain"
                />
                <small className="text-sm md:text-base">Bookmark</small>
            </div>
            <div
                className="flex flex-col items-center md:flex-row md:px-3 md:py-2 md:mb-2 md:gap-x-2  md:hover:bg-white rounded-md md:hover:shadow-sm"
                onClick={() => navigate(`/profile`)}
            >
                <img
                    src={profile}
                    alt="profile"
                    className="md:w-7 md:h-7 md:object-contain"
                />
                <small className="text-sm md:text-base">
                    {Object.keys(user).length === 0 ? "profile" : user.username}
                </small>
            </div>
        </nav>
    );
};

export default Menu;
