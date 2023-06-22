import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

// importing screens
import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import BookmarkScreen from "./screens/Bookmark";
import ProfileScreen from "./screens/ProfileScreen";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ErrorScreen from "./screens/ErrorScreen";
import PostScreen from "./screens/PostScreen";
import EditProfile from "./screens/EditProfile";
import UserScreen from "./screens/UserScreen";

// importing other components
import RequiresAuth from "./utils/RequiresAuth";
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
                <Route
                    path="/bookmarks"
                    element={
                        <RequiresAuth>
                            <BookmarkScreen />
                        </RequiresAuth>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <RequiresAuth>
                            <ProfileScreen />
                        </RequiresAuth>
                    }
                />
                <Route
                    path="/settings/edit-profile"
                    element={
                        <RequiresAuth>
                            <EditProfile />
                        </RequiresAuth>
                    }
                />
                <Route path="/user/:userId" element={<UserScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
                <Route path="/post/:id" element={<PostScreen />} />
                <Route path="*" element={<ErrorScreen />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
