import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { storeContext } from "../utils/store";

const CreatePostScreen = () => {
    const { postReducer } = useContext(storeContext);
    const [post, setPost] = useState("");
    const navigate = useNavigate();

    const createPostHandler = (event) => {
        event.preventDefault();
        postReducer({
            type: "create_post",
            data: { post: post },
        });
        setPost("");
        navigate("/home");
    };
    return (
        <section className="layout">
            <Header />
            <Menu />
            <main className="main-content px-4 mt-3">
                <div className="text-2xl" onClick={() => navigate(-1)}>
                    ←
                </div>
                <div className="flex items-start py-3">
                    <img
                        src="https://avatars.githubusercontent.com/u/94926273?v=4"
                        alt="pushkar singh"
                        className="w-10 h-auto object-contain rounded-full pt-2 mr-3"
                    />
                    <div className="flex flex-col justify-between">
                        <div className="pb-3">
                            <span className="border-2 border-sky-500 px-2    py-0.5 rounded-xl">
                                everyone
                            </span>
                        </div>
                        <textarea
                            cols={40}
                            rows="5"
                            placeholder="what's happening !?"
                            className="w-full outline-none text-lg"
                            value={post}
                            onChange={(event) => setPost(event.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div />
                    <button
                        onClick={createPostHandler}
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 text-base rounded-md text-right"
                    >
                        Post
                    </button>
                </div>
            </main>
        </section>
    );
};

export default CreatePostScreen;
