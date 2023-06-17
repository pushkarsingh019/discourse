import { useRef, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { storeContext } from "../utils/store";
import image from "../assets/image.svg";

const CreatePostScreen = () => {
    const { postReducer, user } = useContext(storeContext);
    const [post, setPost] = useState("");
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

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
                <div
                    className="text-2xl md:hidden"
                    onClick={() => navigate(-1)}
                >
                    ←
                </div>
                <div className="flex items-start py-3">
                    <img
                        src="https://avatars.githubusercontent.com/u/94926273?v=4"
                        alt="pushkar singh"
                        className="w-10 md:w-20 h-auto object-contain rounded-full pt-2 mr-3"
                    />
                    <div className="flex flex-col justify-between">
                        <div className="pb-3">
                            <div className="pb-3">
                                <p className=" text-md font-medium md:text-lg lg:text-xl">
                                    {user.username}
                                </p>
                                <select className="text-sm px-0 py-1 md:text-md md:px-1 md:py-2 outline-none bg-zinc-100">
                                    <option value="everyone">everyone</option>
                                    <option value="community1">
                                        web development
                                    </option>
                                    <option value="community2">
                                        artificail intelligence
                                    </option>
                                </select>
                            </div>
                        </div>
                        <textarea
                            cols={50}
                            rows="5"
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
        </section>
    );
};

export default CreatePostScreen;
