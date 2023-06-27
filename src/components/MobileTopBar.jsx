const MobileTopBar = ({ text }) => {
    return (
        <div className="px-4 py-2.5 bg-white shadow-md font-medium backdrop-filter: blur(20px) bg-opacity-95 md:hidden">
            <p className="text-center text-base">{text}</p>
        </div>
    );
};

export default MobileTopBar;
