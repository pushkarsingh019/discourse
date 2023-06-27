import ProfileSuggestionBox from "./ProfileSuggestionBox";
import { userSuggestion } from "../utils/data";
import search from "../assets/search.svg";
import { useContext } from "react";
import { storeContext } from "../utils/store";

const Search = () => {
    return (
        <div className="bg-white px-4 py-3 flex items-center my-4 gap-x-3 rounded-lg">
            <img src={search} alt="search" />
            <input
                type="text"
                placeholder="search Discourse"
                className="outline-none w-full"
            />
        </div>
    );
};

const SuggestionTab = ({ showPostsFilter }) => {
    const { filterReducer } = useContext(storeContext);
    return (
        <div className="aside-content mr-5 hidden lg:block bg-gray-100 h-screen px-2">
            {showPostsFilter === true ? (
                <select
                    onChange={(e) => filterReducer({ type: e.target.value })}
                    className="mt-2 px-4 py-3 bg-white shadow-sm rounded-md"
                >
                    <option defaultValue={true} value="Latest">
                        Latest Posts
                    </option>
                    <option value="Trending">Trending</option>
                </select>
            ) : (
                ""
            )}
            <Search />
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm">
                <h2 className="text-xl px-1 font-semibold mb-2.5">
                    Who to follow
                </h2>
                <div className="mb-2.5">
                    {userSuggestion.map((user) => {
                        return (
                            <ProfileSuggestionBox
                                key={user.id}
                                id={user.id}
                                name={user.name}
                                username={user.username}
                                image={user.image}
                            />
                        );
                    })}
                </div>
                <p className="text-sky-500 text-sm font-medium px-1">
                    Show More
                </p>
            </div>
        </div>
    );
};

export default SuggestionTab;
