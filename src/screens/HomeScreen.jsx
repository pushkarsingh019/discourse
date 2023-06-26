import Header from "../components/Header";
import Menu from "../components/Menu";
import CreatePost from "../components/CreatePost";
import { useContext } from "react";
import { storeContext } from "../utils/store";
import { useEffect } from "react";
import Post from "../components/Post";
import FloatingCreateButton from "../components/FloatingCreateButton";
import { useNavigate } from "react-router-dom";
import MobileTopBar from "../components/MobileTopBar";

const HomeScreen = () => {
    const { feed, postReducer } = useContext(storeContext);
    const navigate = useNavigate();

    useEffect(() => {
        postReducer({
            type: "get_feed",
        });
        // eslint-disable-next-line
    }, []);

    return (
        <section className="layout bg-gray-100">
            <Header />
            <Menu />
            <FloatingCreateButton />
            <MobileTopBar text={`Discourse`} />
            <main className="main-content px-3 pt-2">
                <CreatePost />
                <br />
                <h2 className="text-2xl font-sans font-medium mb-3 hidden md:block">
                    Latest Posts
                </h2>
                {feed.length === 0 ? (
                    <p className="text-lg">
                        no posts by anyone you follow{" "}
                        <span
                            className="font-medium text-sky-500 hover:cursor-pointer"
                            onClick={() => navigate(`/explore`)}
                        >
                            explore more
                        </span>
                        .
                    </p>
                ) : (
                    feed.map((post) => {
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
