//TODO : This screen is a fork of the profile screen with some changes, we can probably make a more intelligent component, and have it repurposed here, but in the interest of time, here we go.
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../utils/config";
import { storeContext } from "../utils/store";
import FloatingCreateButton from "../components/FloatingCreateButton";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Post from "../components/Post";
import ErrorScreen from "./ErrorScreen";

const UserScreen = () => {
    const { userId } = useParams();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const { posts, postReducer } = useContext(storeContext);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            let { data } = await axios.get(
                `${backendUrl}/api/profile/${userId}`
            );
            setUser(data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
        postReducer({
            type: "fetch_posts",
        });
        // eslint-disable-next-line
    }, []);

    if (loading === true) {
        return (
            <div className="flex h-screen justify-center items-center">
                <p className="text-2xl">loading...</p>
            </div>
        );
    }

    if (user === undefined) {
        return <ErrorScreen />;
    }

    return (
        <section className="layout">
            <Header />
            <Menu />
            <FloatingCreateButton />
            <main className="main-content">
                <div className="px-6 my-6">
                    <div className="flex gap-x-5 items-center md:flex-col md:items-center md:text-center md:gap-y-3">
                        <img
                            src="https://avatars.githubusercontent.com/u/94926273?v=4"
                            alt="avatar"
                            className="w-16 h-16 md:w-32 md:h-32 object-contain rounded-full md:text-center"
                        />
                        <div>
                            <div>
                                <p className="text-xl md:text-3xl font-medium my-2">
                                    {user.name}
                                </p>
                            </div>
                            <button className="border bg-zinc-900 text-white px-3 py-1.5 rounded-md text-sm font-medium md:px-5 md:py-1.5 md:text-base mr-3">
                                follow
                            </button>
                        </div>
                    </div>
                    <br />
                    <div>
                        <p className="text-lg md:text-xl font-medium md:hidden">
                            {user.username}
                        </p>
                        <p className="text-base md:text-center md:px-4">
                            {user.bio}
                        </p>
                    </div>
                    <br />
                    <div className="flex items-center gap-x-4 md:justify-center md:px-2 md:py-2 md:bg-white">
                        <div className="flex gap-x-1 items-center">
                            <p className="text-md font-semibold md:text-lg">
                                {
                                    posts.filter(
                                        (post) =>
                                            post.authorDetails.id === user._id
                                    ).length
                                }
                            </p>
                            <p className="text-md text-gray-600 md:text-lg">
                                Posts
                            </p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <p className="text-md font-semibold md:text-lg">
                                {user.followers.length}
                            </p>
                            <p className="text-md text-gray-600 md:text-lg">
                                Followers
                            </p>
                        </div>
                        <div className="flex gap-x-1 items-center md:text-lg">
                            <p className="text-md font-semibold md:text-lg">
                                {user.follows.length}
                            </p>
                            <p className="text-md text-gray-600">Following</p>
                        </div>
                    </div>
                    <br />
                    <p className="text-lg font-medium mb-2">Posts</p>
                    {posts.filter(
                        (post) => post.authorDetails.id === user._id
                    ) === 0 ? (
                        <p>no posts yet</p>
                    ) : (
                        posts
                            .filter(
                                (post) => post.authorDetails.id === user._id
                            )
                            .map((post) => {
                                return (
                                    <Post
                                        id={post._id}
                                        key={post._id}
                                        post={post.post}
                                        username={post.authorDetails.username}
                                        time={post.time}
                                        likes={post.likes}
                                        community={post.community}
                                        authorDetails={post.authorDetails}
                                        comments={post.comments}
                                    />
                                );
                            })
                    )}
                </div>
            </main>
            <div className="aside-content">
                <h3 className="text-2xl">Who to follow?</h3>
                <ul>
                    <li>Pushkar Singh</li>
                    <li>Pushkar Singh</li>
                    <li>Pushkar Singh</li>
                    <li>Pushkar Singh</li>
                </ul>
            </div>
        </section>
    );
};

export default UserScreen;
