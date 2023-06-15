import { BrowserRouter, Routes, Route } from "react-router-dom";

// importing screens
import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import BookmarkScreen from "./screens/Bookmark";
import ProfileScreen from "./screens/ProfileScreen";
import LandingScreen from "./screens/LandingScreen";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingScreen />} />
                <Route path="/dashboard" element={<HomeScreen />} />
                <Route path="/explore" element={<ExploreScreen />} />
                <Route path="/create" element={<CreatePostScreen />} />
                <Route path="/bookmarks" element={<BookmarkScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="*" element={<h3>something is wrong</h3>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
