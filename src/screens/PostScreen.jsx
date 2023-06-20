import React from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storeContext } from "../utils/store";
import ErrorScreen from "./ErrorScreen";
import Menu from "../components/Menu";
import Header from "../components/Header";

import comment from "../assets/comment.svg";
import like from "../assets/like.svg";
import share from "../assets/share.svg";
import bookmark1 from "../assets/bookmark1.svg";
import liked from "../assets/liked.svg";
import bookmarked from "../assets/bookmarked.svg";
import goBack from "../assets/goBack.svg";
import meatballs from "../assets/meatballs.svg";

import { formatTime, getDate } from "../utils/compareTime";
import { useEffect } from "react";

const PostScreen = () => {
    const { id } = useParams();
    const { postsInteractionReducer, user, postToShow, postReducer } =
        useContext(storeContext);
    const { _id, authorDetails, post, likes, comments, time } = postToShow;
    const navigate = useNavigate();

    useEffect(() => {
        postReducer(
            {
                type: "get_post",
                id: id,
            },
            []
        );
        // eslint-disable-next-line
    }, []);
    if (Object.keys(postToShow).length === 0) {
        return <ErrorScreen />;
    } else {
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
                //TODO: add the toast to show, copy to clipboard...
            }
        };
        return (
            <section className="layout">
                <Header />
                <Menu />
                <main className="main-content px-4 py-2 flex flex-col gap-y-3">
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
                        <div className="flex gap-x-1 items-center">
                            <img
                                src="https://avatars.githubusercontent.com/u/94926273?v=4"
                                alt="pushkar singh"
                                className="w-11 h-11 object-contain rounded-full mr-3 md:w-14 md:h-14"
                            />
                            <div className="flex flex-col">
                                <p className="text-lg font-medium">
                                    Pushkar Singh
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
                        <div
                            onClick={shareHandler}
                            className="flex gap-x-1 items-center"
                        >
                            <img src={share} alt="comments" />
                        </div>
                    </div>
                    <hr />
                    <div className="flex items-center md:justify-between">
                        <img
                            src="https://avatars.githubusercontent.com/u/94926273?v=4"
                            alt="pushkar singh"
                            className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-full mr-4 md:m-0"
                        />
                        <input
                            type="text"
                            className="w-4/6 px-1 py-2 outline-none mr-3 md:m-0"
                            placeholder="comment on the post"
                        />
                        <button className="px-2 py-1 md:px-3 md:py-1 text-md rounded-md bg-indigo-600 text-white text-right">
                            reply
                        </button>
                    </div>
                </main>
                <div className="aside-content">
                    <h2 className="text-2xl">Who to follow?</h2>
                    <p>pushkar singh</p>
                    <p>pushkar singh</p>
                    <p>pushkar singh</p>
                    <p>pushkar singh</p>
                </div>
            </section>
        );
    }
};

export default PostScreen;
