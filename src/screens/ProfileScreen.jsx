import { useContext } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { storeContext } from "../utils/store";
import Post from "../components/Post";
import FloatingCreateButton from "../components/FloatingCreateButton";
import { useNavigate } from "react-router-dom";
import MobileTopBar from "../components/MobileTopBar";
import { useEffect } from "react";
import SuggestionTab from "../components/SuggestionTab";

const ProfileScreen = () => {
    const { profileReducer, user, posts, postReducer } =
        useContext(storeContext);
    const navigate = useNavigate();

    const editProfileHandler = () => {
        navigate(`/settings/edit-profile`, { state: { userId: user._id } });
    };

    useEffect(() => {
        postReducer({
            type: "fetch_posts",
        });
        profileReducer({
            type: "get_profile",
            userId: user._id,
        });
        // eslint-disable-next-line
    }, []);

    return (
        <section className="layout">
            <Header />
            <Menu />
            <FloatingCreateButton />
            <main className="main-content bg-white">
                <MobileTopBar text={`Profile`} />
                <div className="px-4 my-6">
                    {/* the profile icon and the name -- cta buttons */}
                    <div className="flex gap-x-5 items-stretch md:flex-col md:items-center md:text-center md:gap-y-3">
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className="w-16 h-16 md:w-32 md:h-32 object-cover rounded-full md:text-center"
                        />
                        <div>
                            <div>
                                <p className="text-xl md:text-3xl font-medium my-2">
                                    {user.name}
                                </p>
                            </div>
                            <button
                                onClick={editProfileHandler}
                                className="border hover:bg-gray-100 px-3 py-1 rounded-md text-sm font-medium md:px-5 md:py-1 md:text-base mr-3"
                            >
                                edit profile
                            </button>
                            <button
                                onClick={() =>
                                    profileReducer({ type: "logout" })
                                }
                                className="border hover:bg-gray-100 border-gray-300 px-3 py-1 rounded-md text-sm font-medium md:px-5 md:py-1 md:text-base"
                            >
                                logout
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
                        <p className="text-base md:text-center mt-2 md:mt-4">
                            <a
                                href={`https://${user.portfolioLink}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sky-500 font-medium"
                            >
                                {user.portfolioLink}
                            </a>
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
            <SuggestionTab />
        </section>
    );
};

export default ProfileScreen;
