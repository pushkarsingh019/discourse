import { BrowserRouter, Routes, Route } from "react-router-dom";

// importing screens
import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import BookmarkScreen from "./screens/Bookmark";
import ProfileScreen from "./screens/ProfileScreen";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

// importing other components
import RequiresAuth from "./utils/RequiresAuth";
import { useContext } from "react";
import { storeContext } from "./utils/store";

const App = () => {
    const { user } = useContext(storeContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        Object.keys(user).length !== 0 ? (
                            <HomeScreen />
                        ) : (
                            <LandingScreen />
                        )
                    }
                />
                <Route
                    path="/home"
                    element={
                        <RequiresAuth>
                            <HomeScreen />
                        </RequiresAuth>
                    }
                />
                <Route path="/explore" element={<ExploreScreen />} />
                <Route
                    path="/create"
                    element={
                        <RequiresAuth>
                            <CreatePostScreen />
                        </RequiresAuth>
                    }
                />
                <Route path="/bookmarks" element={<BookmarkScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
                <Route path="*" element={<h3>something is wrong</h3>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
