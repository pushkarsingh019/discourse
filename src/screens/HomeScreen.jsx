import Header from "../components/Header";
import Menu from "../components/Menu";
import CreatePost from "../components/CreatePost";
import { useContext } from "react";
import { storeContext } from "../utils/store";
import { useEffect } from "react";
import edit from "../assets/edit.svg";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";

const HomeScreen = () => {
    const { posts, postReducer } = useContext(storeContext);
    const navigate = useNavigate();

    useEffect(() => {
        postReducer({
            type: "fetch_posts",
        });
        // eslint-disable-next-line
    }, []);

    return (
        <section className="layout bg-gray-100">
            <Header />
            <Menu />
            <div
                className="bg-indigo-600 text-white fixed right-3 bottom-20 px-3.5 py-3.5 rounded-full md:hidden z-0 shadow-xl"
                onClick={() => navigate("/create")}
            >
                <img src={edit} alt="new post" />
            </div>
            <main className="main-content px-3 pt-2">
                <CreatePost />
                <br />
                <h2 className="text-2xl font-sans font-medium mb-3">
                    Latest Posts
                </h2>
                <br />
                {posts.map((post) => {
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
                })}
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

export default HomeScreen;
