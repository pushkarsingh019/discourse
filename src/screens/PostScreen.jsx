import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { storeContext } from "../utils/store";
import ErrorScreen from "./ErrorScreen";

const PostScreen = () => {
    const { id } = useParams();
    const { posts } = useContext(storeContext);
    const postToShow = posts.find((post) => post._id === id);

    if (postToShow === undefined) {
        return <ErrorScreen />;
    } else {
        return (
            <section>
                <h2>{postToShow.post}</h2>
            </section>
        );
    }
};

export default PostScreen;
