import ProfileSuggestionBox from "./ProfileSuggestionBox";
import { userSuggestion } from "../utils/data";
import search from "../assets/search.svg";

const Search = () => {
    return (
        <div className="bg-white px-4 py-3 flex items-center mb-4 gap-x-3 rounded-lg">
            <img src={search} alt="search" />
            <input
                type="text"
                placeholder="search Discourse"
                className="outline-none w-full"
            />
        </div>
    );
};

const SuggestionTab = () => {
    return (
        <div className="aside-content mr-5 hidden lg:block">
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
