import { useState } from "react";
import { useContext } from "react";
import { storeContext } from "../utils/store";

const CreatePost = () => {
    const { postReducer } = useContext(storeContext);
    const [post, setPost] = useState();

    const createPostHandler = (event) => {
        event.preventDefault();
        postReducer({
            type: "create_post",
            data: { post: post },
        });
        setPost("");
    };
    return (
        <form
            onSubmit={createPostHandler}
            className=" py-5 text-right hidden md:block w-full"
        >
            <textarea
                rows={5}
                className="w-full border outline-none px-6 py-4 text-base md:text-lg"
                value={post}
                onChange={(event) => setPost(event.target.value)}
                placeholder="Whats happening !?"
            ></textarea>
            <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-1 rounded-md"
            >
                Post
            </button>
        </form>
    );
};

export default CreatePost;
