import { useState } from "react";
import { useContext } from "react";
import { storeContext } from "../utils/store";

const CommentForm = ({ postId }) => {
    const { commentsReducer } = useContext(storeContext);
    const [comment, setComment] = useState("");

    const postComment = () => {
        commentsReducer({
            type: "new_comment",
            comment: comment,
            id: postId,
        });
        setComment("");
    };

    return (
        <div className="flex items-center md:justify-between">
            <img
                src="https://avatars.githubusercontent.com/u/94926273?v=4"
                alt="pushkar singh"
                className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-full mr-4 md:m-0"
            />
            <input
                type="text"
                className="w-4/6 px-1 py-2 outline-none mr-3 md:m-0"
                placeholder="Comment your reply !"
                value={comment}
                required
                onChange={(e) => setComment(e.target.value)}
            />
            <button
                onClick={postComment}
                className="px-2 py-1 md:px-3 md:py-1 text-sm md:text-md rounded-md bg-indigo-600 text-white text-right"
                disabled={comment === "" ? true : false}
            >
                reply
            </button>
        </div>
    );
};

export default CommentForm;
