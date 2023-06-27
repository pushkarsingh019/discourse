import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storeContext } from "../utils/store";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Comment from "../components/Comment";
import { formatTime, getDate } from "../utils/compareTime";

import comment from "../assets/comment.svg";
import like from "../assets/like.svg";
import share from "../assets/share.svg";
import bookmark1 from "../assets/bookmark1.svg";
import liked from "../assets/liked.svg";
import bookmarked from "../assets/bookmarked.svg";
import goBack from "../assets/goBack.svg";
import meatballs from "../assets/meatballs.svg";
import hide from "../assets/hide.svg";
import unfollow from "../assets/unfollow.svg";
import edit_black from "../assets/edit_black.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import analytics from "../assets/analytics.svg";
import CommentForm from "../components/CommentForm";
import SuggestionTab from "../components/SuggestionTab";
import { toast } from "react-hot-toast";

const PostScreen = () => {
    const { id } = useParams();
    const {
        postsInteractionReducer,
        user,
        postToShow,
        postReducer,
        posts,
        profileReducer,
    } = useContext(storeContext);
    const { _id, authorDetails, post, likes, comments, time } = postToShow;
    const navigate = useNavigate();
    const [isModalOpen, setToggleModal] = useState(false);

    const handleModalChange = (toggleState) => setToggleModal(toggleState);

    const hidePost = () => {
        //TODO : handle hiding a post.
        console.log("currently not handling the hide feature, but soon..");
        setToggleModal(false);
    };

    const shareHandler = (event) => {
        const { origin } = window.location;
        if (navigator.share) {
            navigator
                .share({
                    title: `post by ${authorDetails.username}`,
                    text: post,
                    url: origin,
                })
                .then(() => console.log("share function executed..."))
                .catch((error) =>
                    console.log(`error sharing : ${error.message}`)
                );
        } else {
            navigator.clipboard.writeText(`${origin}/post/${_id}`);
            toast.success("copied to clipboard", {
                duration: 2000,
                position: "top-center",
            });
        }
    };

    useEffect(() => {
        postReducer({
            type: "get_post",
            id: id,
        });
        // eslint-disable-next-line
    }, [posts]);

    const ViewerOptions = () => {
        return (
            <ul>
                <li
                    onClick={() => {
                        profileReducer({
                            type: "unfollow",
                            id: postToShow.authorDetails.id,
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
                        unfollow @ {postToShow.authorDetails.username}
                    </p>
                </li>
                <li
                    onClick={() => {
                        setToggleModal(false);
                        shareHandler();
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
                                postId: postToShow._id,
                                postText: postToShow.post,
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
                        postReducer({ type: "delete", id: postToShow._id });
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

    if (Object.keys(postToShow).length === 0) {
        return (
            <div className="flex h-screen justify-center items-center">
                <p className="text-2xl font-medium">loading...</p>
            </div>
        );
    } else {
        return (
            <section className="layout">
                <Header />
                <Menu />
                <main className="main-content px-4 py-2 flex flex-col gap-y-3 bg-white">
                    <Modal
                        isOpen={isModalOpen}
                        toggleIsOpen={handleModalChange}
                    >
                        {Object.keys(user).length === 0 ? (
                            <ViewerOptions />
                        ) : user._id === postToShow.authorDetails.id ? (
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
                    <div className="flex gap-x-3 items-center">
                        <img
                            src={goBack}
                            className="h-5 w-5"
                            alt="go back"
                            onClick={() => navigate(-1)}
                        />
                        <h3 className="text-lg font-medium">Post</h3>
                    </div>
                    <div className="flex justify-between items-start md:mb-4">
                        <div
                            className="flex gap-x-1 items-center"
                            onClick={() =>
                                navigate(`/user/${authorDetails.username}`)
                            }
                        >
                            <img
                                src="https://avatars.githubusercontent.com/u/94926273?v=4"
                                alt="pushkar singh"
                                className="w-11 h-11 object-contain rounded-full mr-3 md:w-14 md:h-14"
                            />
                            <div className="flex flex-col">
                                <p className="text-lg font-medium">
                                    {authorDetails.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    @{authorDetails.username}
                                </p>
                            </div>
                        </div>
                        <img
                            src={meatballs}
                            alt="menu"
                            className="w-12 h-10 object-contain"
                            onClick={() => setToggleModal(true)}
                        />
                    </div>
                    <p className="text-lg mb-3 md:text-xl">{post}</p>
                    <div className="flex items-center gap-x-3">
                        <p className="text-base text-gray-600 font-medium">
                            {formatTime(time)}
                        </p>
                        <p className="text-base text-gray-600 font-medium">
                            {getDate(time)}
                        </p>
                    </div>
                    <hr />
                    <p className="">
                        <strong>{likes?.length}</strong>{" "}
                        {likes.length === 1 ? "Like" : "Likes"}
                    </p>
                    <hr />
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
                                alt="like"
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
                    <hr />
                    <CommentForm postId={postToShow._id} />
                    <hr />
                    {comments.reverse().map((comment) => {
                        return (
                            <Comment
                                key={comment._id}
                                text={comment.comment}
                                username={comment.authorDetails.username}
                            />
                        );
                    })}
                </main>
                <SuggestionTab />
            </section>
        );
    }
};

export default PostScreen;
