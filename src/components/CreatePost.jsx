import { useState } from "react";
import { useContext } from "react";
import { storeContext } from "../utils/store";
import image from "../assets/image.svg";
import { useRef } from "react";

const CreatePost = () => {
    const { postReducer, user } = useContext(storeContext);
    const [post, setPost] = useState();
    const [file, setFile] = useState();
    const fileInputRef = useRef(null);

    const createPostHandler = (event) => {
        event.preventDefault();
        postReducer({
            type: "create_post",
            data: { post: post },
        });
        setPost("");
    };
    return (
        <main className="main-content px-6 py-2 pb-3  bg-white rounded-lg hidden md:block font-sans">
            <div className="flex items-start py-3">
                <div className="pt-2 mr-3">
                    <img
                        src={user.avatar}
                        alt="pushkar singh"
                        className="w-10 h-10 object-cover rounded-full"
                    />
                </div>
                <div className="flex flex-col justify-between w-full">
                    <div className="pb-3">
                        <p className=" font-medium">{user.username}</p>
                        <select className="text-sm px-0 py-1 outline-none bg-zinc-100">
                            <option value="everyone">everyone</option>
                            <option value="community1">community one</option>
                            <option value="community2">community two</option>
                        </select>
                    </div>
                    <textarea
                        cols={50}
                        rows="3"
                        placeholder="what's happening !?"
                        className="w-full outline-none text-lg"
                        value={post}
                        onChange={(event) => setPost(event.target.value)}
                    ></textarea>
                    <br />
                    <div className="flex justify-between mb-2 gap-x-2">
                        <div className="flex items-center">
                            <img
                                src={image}
                                alt="add file"
                                onClick={() => fileInputRef.current.click()}
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                onChange={(event) =>
                                    setFile(event.target.files[0])
                                }
                            />
                            <p className="text-sm text-black">
                                {file ? file.name : ""}
                            </p>
                        </div>
                        <button
                            onClick={createPostHandler}
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1 text-base rounded-md text-right"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreatePost;
