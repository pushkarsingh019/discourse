import comment from "../assets/comment.svg";
import like from "../assets/like.svg";
import share from "../assets/share.svg";
import bookmark1 from "../assets/bookmark1.svg";

import { compareTime } from "../utils/compareTime";

const Post = ({
    id,
    authorDetails,
    community,
    post,
    upvotes,
    downvotes,
    likes,
    comments,
    time,
    username,
}) => {
    return (
        <div className="flex items-start mb-6 bg-white px-2 py-3 rounded-lg shadow-md">
            <img
                src="https://avatars.githubusercontent.com/u/94926273?v=4"
                alt="pushkar singh"
                className="w-10 h-auto object-contain rounded-full mr-3 md:w-11"
            />
            <div className="flex flex-col justify-between w-full">
                <div className="flex gap-x-2 items-center mb-4 md:mb-5">
                    <div className="text-base font-medium">Pushkar Singh</div>
                    <div className="text-gray-600">@{username}</div>
                    <div className="text-sm">{compareTime(time)}</div>
                </div>
                <p className="text-base md:text-lg mb-6">{post}</p>
                <div className="flex justify-between pr-6 items-center">
                    <div className="flex gap-x-1 items-center">
                        <img src={comment} alt="comments" />
                        <p>1</p>
                    </div>
                    <div className="flex gap-x-1 items-center">
                        <img src={like} alt="comments" />
                        <p>1</p>
                    </div>
                    <div className="flex gap-x-1 items-center">
                        <img src={bookmark1} alt="comments" />
                    </div>
                    <div className="flex gap-x-1 items-center">
                        <img src={share} alt="comments" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
