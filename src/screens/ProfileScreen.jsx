import { useContext } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { storeContext } from "../utils/store";

const ProfileScreen = () => {
    const { profileReducer } = useContext(storeContext);
    return (
        <section className="layout">
            <Header />
            <Menu />
            <main className="main-content">
                <h3>the profile page</h3>
                <button
                    className="px-2 py-1.5 bg-purple-400 rounded-md text-white"
                    onClick={() => profileReducer({ type: "logout" })}
                >
                    logout
                </button>
            </main>
        </section>
    );
};

export default ProfileScreen;
