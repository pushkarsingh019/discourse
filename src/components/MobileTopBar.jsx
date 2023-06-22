const MobileTopBar = ({ text }) => {
    return (
        <div className="px-4 py-2 shadow-md font-medium backdrop-filter: blur(20px) bg-opacity-95 bg-gray-50 md:hidden">
            <p className="text-center text-md">{text}</p>
        </div>
    );
};

export default MobileTopBar;
