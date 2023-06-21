import { useContext } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { storeContext } from "../utils/store";
import Post from "../components/Post";
import FloatingCreateButton from "../components/FloatingCreateButton";

const ProfileScreen = () => {
    const { profileReducer, user, posts } = useContext(storeContext);
    return (
        <section className="layout">
            <Header />
            <Menu />
            <FloatingCreateButton />
            <main className="main-content">
                <div className=" px-4 py-2 shadow-md font-medium backdrop-filter: blur(20px) bg-opacity-95 bg-gray-50 md:hidden ">
                    <p className="text-center text-base">profile</p>
                </div>
                <div className="px-4 my-6">
                    {/* the profile icon and the name -- cta buttons */}
                    <div className="flex gap-x-5 items-stretch">
                        <img
                            src="https://avatars.githubusercontent.com/u/94926273?v=4"
                            alt="avatar"
                            className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full"
                        />
                        <div>
                            <p className="text-xl md:text-2xl font-medium mb-2">
                                {user.username}
                            </p>
                            <button className="bg-gray-100 px-3 py-1 rounded-md text-sm md:px-5 md:py-1.5 md:text-base mr-3">
                                edit profile
                            </button>
                            <button
                                onClick={() =>
                                    profileReducer({ type: "logout" })
                                }
                                className="bg-gray-100 px-3 py-1 rounded-md text-sm md:px-5 md:py-1.5 md:text-base"
                            >
                                logout
                            </button>
                        </div>
                    </div>
                    <br />
                    <div>
                        <p className="text-base">{user.bio}</p>
                    </div>
                    <br />
                    <div className="flex items-center gap-x-4">
                        <div className="flex gap-x-1 items-center">
                            <p className="text-md font-semibold">
                                {
                                    posts.filter(
                                        (post) =>
                                            post.authorDetails.id === user._id
                                    ).length
                                }
                            </p>
                            <p className="text-md text-gray-600">Posts</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <p className="text-md font-semibold">
                                {user.followers.length}
                            </p>
                            <p className="text-md text-gray-600">Followers</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <p className="text-md font-semibold">
                                {user.follows.length}
                            </p>
                            <p className="text-md text-gray-600">Following</p>
                        </div>
                    </div>
                    <br />
                    <p className="text-lg font-medium mb-2">Posts</p>
                    {/* TODO : checking posts by mapping over all the posts on the platform is a shit way to do this, updtate the server.js file */}
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

export default ProfileScreen;
