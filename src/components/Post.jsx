import comment from "../assets/comment.svg";
import like from "../assets/like.svg";
import share from "../assets/share.svg";
import bookmark1 from "../assets/bookmark1.svg";
import liked from "../assets/liked.svg";
import bookmarked from "../assets/bookmarked.svg";
import meatballs from "../assets/meatballs.svg";
import hide from "../assets/hide.svg";
import unfollow from "../assets/unfollow.svg";
import edit_black from "../assets/edit_black.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import analytics from "../assets/analytics.svg";

import { compareTime } from "../utils/compareTime";
import { useContext, useState } from "react";
import { storeContext } from "../utils/store";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal";

const Post = ({
    id,
    authorDetails,
    community,
    post,
    likes,
    comments,
    time,
    username,
    name,
}) => {
    const { postsInteractionReducer, user, profileReducer, postReducer } =
        useContext(storeContext);
    const navigate = useNavigate();
    const [isModalOpen, setToggleModal] = useState(false);

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

    const hidePost = () => console.log("hide post function");
    const handleModalChange = (toggleState) => setToggleModal(toggleState);

    const ViewerOptions = () => {
        return (
            <ul>
                <li
                    onClick={() => {
                        profileReducer({
                            type: "unfollow",
                            id: authorDetails.id,
                        });
                        setToggleModal(false);
                    }}
                    className="flex gap-3 items-center py-2"
                >
                    <img
                        src={unfollow}
                        alt="unfollow icon"
                        className="w-6 h-6"
                    />
                    <p className="text-base font-medium">
                        unfollow @ {username}
                    </p>
                </li>
                <li
                    onClick={() => {
                        shareHandler();
                        setToggleModal(false);
                    }}
                    className="flex gap-3 items-center py-2"
                >
                    <img src={share} alt="share icon" className="w-6 h-6" />
                    <p className="text-base font-medium">share post</p>
                </li>
                <li onClick={hidePost} className="flex gap-3 items-center py-2">
                    <img src={hide} alt="hide icon" className="w-6 h-6" />
                    <p className="text-base font-medium">hide post</p>
                </li>
            </ul>
        );
    };

    const OwnerOptions = () => {
        return (
            <ul>
                <li
                    onClick={() => {
                        setToggleModal(false);
                        navigate(`/create`, {
                            state: {
                                edit: true,
                                postId: id,
                                postText: post,
                            },
                        });
                    }}
                    className="flex gap-3 items-center py-2"
                >
                    <img src={edit_black} alt="edit icon" className="w-6 h-6" />
                    <p className="text-base font-medium">Edit post</p>
                </li>
                <li
                    onClick={() => {
                        postReducer({ type: "delete", id: id });
                        setToggleModal(false);
                    }}
                    className="flex gap-3 items-center py-2"
                >
                    <img
                        src={deleteIcon}
                        alt="delete icon"
                        className="w-6 h-6"
                    />
                    <p className="text-base font-medium">Delete Post</p>
                </li>
                <li
                    onClick={shareHandler}
                    className="flex gap-3 items-center py-2"
                >
                    <img src={share} alt="share icon" className="w-6 h-6" />
                    <p className="text-base font-medium">Share</p>
                </li>
                <li className="flex gap-3 items-center py-2">
                    <img src={analytics} alt="hide icon" className="w-6 h-6" />
                    <p className="text-base font-medium">Analytics</p>
                </li>
            </ul>
        );
    };

    return (
        <div className="flex items-start mb-6 bg-white px-2 py-3 rounded-xl  border md:shadow-sm">
            <Modal isOpen={isModalOpen} toggleIsOpen={handleModalChange}>
                {Object.keys(user).length === 0 ? (
                    <ViewerOptions />
                ) : user._id === authorDetails.id ? (
                    <OwnerOptions />
                ) : (
                    <ViewerOptions />
                )}

                <button
                    onClick={() => setToggleModal(false)}
                    className="w-full border rounded-lg text-md font-medium py-1.5 px-2 mt-3 bg-gray-50"
                >
                    Cancel
                </button>
            </Modal>
            <img
                src="https://avatars.githubusercontent.com/u/94926273?v=4"
                alt="pushkar singh"
                className="w-10 h-auto object-contain rounded-full mr-3 md:w-11"
                onClick={() => navigate(`/user/${username}`)}
            />
            <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between items-center">
                    <div className="flex gap-x-4 items-center mb-4 md:mb-5">
                        <div
                            className="text-base md:text-lg font-medium"
                            onClick={() => navigate(`/user/${username}`)}
                        >
                            @{username}
                        </div>
                        <div className="text-sm">{compareTime(time)}</div>
                    </div>
                    <img
                        src={meatballs}
                        alt="menu"
                        className="w-12 h-10 object-contain"
                        onClick={() => setToggleModal(true)}
                    />
                </div>
                <p
                    onClick={() => navigate(`/post/${id}`)}
                    className="text-base md:text-lg mb-6"
                >
                    {post}
                </p>
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
                    {Object.keys(user).length !== 0 ? (
                        <div className="flex gap-x-1 items-center">
                            <img
                                src={
                                    user.bookmarks.filter(
                                        (post) => post._id === id
                                    ).length > 0
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
                    ) : (
                        ""
                    )}
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
