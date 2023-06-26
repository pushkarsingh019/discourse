const ProfileSuggestionBox = ({ name, username, image, userId }) => {
    return (
        <div className="gap-x-3 items-center px-3 py-2 bg-white rounded-lg flex my-1">
            <img
                src={image}
                alt={name}
                className="w-11 h-11 rounded-full object-contain"
            />
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className="text-lg font-medium">{name}</p>
                    <p className="text-base text-gray-600">@{username}</p>
                </div>
                <button className="bg-black text-white px-4 py-1 rounded-lg">
                    Follow
                </button>
            </div>
        </div>
    );
};

export default ProfileSuggestionBox;
