import { useNavigate } from "react-router-dom";

// the meno would include -> home, explore, bookmark, profile, create
import home from "../assets/home.svg";
import explore from "../assets/explore.svg";
import create from "../assets/create.svg";
import bookmarks from "../assets/bookmark.svg";
import profile from "../assets/profileBlack.svg";

const Menu = () => {
    const navigate = useNavigate();
    return (
        // <nav className=" menu flex justify-between items-center pb-2 pt-3 px-4 bg-gray-50 rounded-t-2xl bg-white-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border-solid border border-black">
        <nav className="menu">
            <div
                className="flex flex-col items-center md:flex-row md:px-3 md:py-3 md:bg-gray-300 md:mb-4"
                onClick={() => navigate(`/`)}
            >
                <img src={home} alt="home" />
                <small>Home</small>
            </div>
            <div
                className="flex flex-col items-center md:flex-row md:px-3 md:py-3 md:bg-gray-300 md:mb-4"
                onClick={() => navigate(`/explore`)}
            >
                <img src={explore} alt="explore" />
                <small className="text-small">Explore</small>
            </div>
            <div
                className="flex flex-col items-center md:flex-row md:px-3 md:py-3 md:bg-gray-300 md:mb-4"
                onClick={() => navigate(`/create`)}
            >
                <img src={create} alt="create" />
                <small>Create</small>
            </div>
            <div
                className="flex flex-col items-center md:flex-row md:px-3 md:py-3 md:bg-gray-300 md:mb-4"
                onClick={() => navigate(`/bookmarks`)}
            >
                <img src={bookmarks} alt="bookmarks" />
                <small>Bookmark</small>
            </div>
            <div
                className="flex flex-col items-center md:flex-row md:px-3 md:py-3 md:bg-gray-300 md:mb-4"
                onClick={() => navigate(`/profile`)}
            >
                <img src={profile} alt="profile" />
                <small>profile</small>
            </div>
        </nav>
    );
};

export default Menu;
