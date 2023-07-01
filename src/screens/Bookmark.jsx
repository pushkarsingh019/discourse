import { useContext } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { storeContext } from "../utils/store";
import Post from "../components/Post";
import FloatingCreateButton from "../components/FloatingCreateButton";
import SuggestionTab from "../components/SuggestionTab";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const BookmarkScreen = () => {
    const { user } = useContext(storeContext);
    const [parent] = useAutoAnimate();
    return (
        <section className="layout">
            <Header />
            <Menu />
            <FloatingCreateButton />
            <main className="main-content px-3 mt-10">
                <h2 className="text-2xl font-sans font-medium mb-3">
                    Your bookmarks
                </h2>
                <div ref={parent}>
                    {user.bookmarks.length === 0 ? (
                        <p className="text-base font-mono">no bookmarks yet</p>
                    ) : (
                        user.bookmarks.map((post) => {
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

export default BookmarkScreen;
