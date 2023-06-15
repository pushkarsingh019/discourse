import profileImage from "../assets/profile.svg";

const Header = () => {
    return (
        <header className="flex justify-between items-center px-5 py-4 bg-red-500 header">
            <h3 className="md:text-3xl font-medium text-white">Discourse</h3>
            <div className="hidden md:flex ">
                <img src={profileImage} alt="profile" />
                <span className="text-white ml-1">Login</span>
            </div>
        </header>
    );
};

export default Header;
