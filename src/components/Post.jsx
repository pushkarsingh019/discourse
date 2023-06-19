import comment from "../assets/comment.svg";
import like from "../assets/like.svg";
import share from "../assets/share.svg";
import bookmark1 from "../assets/bookmark1.svg";
import liked from "../assets/liked.svg";
import bookmarked from "../assets/bookmarked.svg";

import { compareTime } from "../utils/compareTime";
import { useContext } from "react";
import { storeContext } from "../utils/store";

const Post = ({
    id,
    authorDetails,
    community,
    post,
    likes,
    comments,
    time,
    username,
}) => {
    const { postsInteractionReducer, user } = useContext(storeContext);

    const shareHandler = (event) => {
        const { origin } = window.location;
        if (navigator.share) {
            navigator
                .share({
                    title: `post by ${authorDetails.username}`,
                    text: post,
                    url: `${origin}/post/${id}`,
                })
                .then(() => console.log("share function executed..."))
                .catch((error) =>
                    console.log(`error sharing : ${error.message}`)
                );
        } else {
            navigator.clipboard.writeText(`${origin}/post/${id}`);
            //TODO: add the toast to show, copy to clipboard...
        }
    };

    return (
        <div className="flex items-start mb-6 bg-white px-2 py-3 rounded-lg shadow-md">
            <img
                src="https://avatars.githubusercontent.com/u/94926273?v=4"
                alt="pushkar singh"
                className="w-10 h-auto object-contain rounded-full mr-3 md:w-11"
            />
            <div className="flex flex-col justify-between w-full">
                <div className="flex gap-x-2 items-center mb-4 md:mb-5">
                    <div className="text-base font-medium">Pushkar Singh</div>
                    <div className="text-gray-600">@{username}</div>
                    <div className="text-sm">{compareTime(time)}</div>
                </div>
                <p className="text-base md:text-lg mb-6">{post}</p>
                <div className="flex justify-between pr-6 items-center">
                    <div className="flex gap-x-1 items-center">
                        <img src={comment} alt="comments" />
                        <p>{comments.length}</p>
                    </div>
                    <div className="flex gap-x-1 items-center">
                        <img
                            src={
                                likes.filter((like) => like.id === user._id)
                                    .length > 0
                                    ? liked
                                    : like
                            }
                            alt="comments"
                            onClick={() =>
                                postsInteractionReducer({
                                    type: "like",
                                    id: id,
                                })
                            }
                        />
                        <p>{likes.length}</p>
                    </div>
                    <div className="flex gap-x-1 items-center">
                        <img
                            src={
                                user.bookmarks.filter((post) => post._id === id)
                                    .length > 0
                                    ? bookmarked
                                    : bookmark1
                            }
                            alt="bookmarks"
                            onClick={() =>
                                postsInteractionReducer({
                                    type:
                                        user.bookmarks.filter(
                                            (post) => post._id === id
                                        ).length > 0
                                            ? "remove_bookmark"
                                            : "bookmark",
                                    id: id,
                                })
                            }
                        />
                    </div>
                    <div
                        onClick={shareHandler}
                        className="flex gap-x-1 items-center"
                    >
                        <img src={share} alt="comments" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
