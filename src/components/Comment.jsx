const Comment = ({ text, username }) => {
    return (
        <div className=" px-2 rounded-md md:px-3">
            <p className="text-sm font-normal md:text-md">@{username}</p>
            <p className="text-md md:text-lg mb-1.5">{text}</p>
            <hr />
        </div>
    );
};

export default Comment;
