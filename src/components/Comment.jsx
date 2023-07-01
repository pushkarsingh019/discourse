const Comment = ({ text, username }) => {
    return (
        <div className="px-2 rounded-md md:px-3 mt-1.5">
            <small className="text-sm font-semibold md:text-md mb-0">
                @{username}
            </small>
            <p className="text-md md:text-lg mb-2 mt-0">{text}</p>
            <hr />
        </div>
    );
};

export default Comment;
